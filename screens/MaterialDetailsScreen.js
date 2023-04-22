import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import locationService from "../api/locationService";
import materialService from "../api/materialService";
import CircleButton from "../components/CircleButton";
import CircleButtonDanger from "../components/CircleButtonDanger";
import LocationOfMaterialItem from "../components/LocationOfMaterialItem";
import SideActionHeader from "../components/SideActionHeader";
import { InternetContext } from "../context/InternetContext";
import styles from "../theme/styles";
import { getCachedDataObject } from "../utils/storage";

const MaterialDetailsScreen = ({ navigation, route }) => {
  const { material } = route.params;

  const { networkAvailable } = React.useContext(InternetContext);

  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const fetchLocation = React.useCallback(async () => {
    const locations = await locationService.fetchAllLocations();

    return locations.filter((location) => {
      return location.materielId ? location.materielId == material.id : false;
    });
  }, [material]);

  const loadLocations = React.useCallback(async () => {
    setLoading(true);
    try {
      let locations;
      if (networkAvailable) {
        // Chargement des locations via l'API
        locations = await fetchLocation();
      } else {
        // Chargement des locations dans le cache
        locations = await getCachedDataObject("locations");
        if (locations === null) {
          throw "pas de location en cache";
        }
      }
      setLocations(locations);
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }, [fetchLocation, networkAvailable]);

  const refreshLocations = React.useCallback(async () => {
    if (!networkAvailable) {
      return;
    }
    try {
      setRefresh(true);
      const locations = await fetchLocation();
      setLocations(locations);
    } catch (error) {
      console.log("error", error);
    }
    setRefresh(false);
  }, [fetchLocation, networkAvailable]);

  React.useEffect(() => {
    loadLocations();
  }, []);

  const handleDelete = React.useCallback(async () => {
    const deleted = await materialService.deleteMaterialById(material.id);

    if (deleted) {
      navigation.navigate({
        name: "Materials",
        params: { deletedMaterialId: material.id },
      });
    }

    return deleted;
  }, [material]);

  const handleEdit = React.useCallback(() => {
    navigation.navigate("EditMaterial", {
      material: material,
    });
  }, []);

  const handleShowLocation = React.useCallback((location) => {
    navigation.navigate("DetailsLocation", {
      location: location,
    });
  }, []);

  return (
    <View>
      <View style={screenStyles.header}>
        <SideActionHeader
          leftAction={
            <CircleButtonDanger
              onDelete={handleDelete}
              iconName="trash"
              alertMessage="Voulez-vous vraiment supprimer ce materiel ?"
            />
          }
          rightAction={<CircleButton onPress={handleEdit} iconName="create" />}
        >
          <View>
            <Text style={styles.pageTitle}>{material.nom}</Text>
            <Text>{material.prixParJour} € / jour</Text>
          </View>
        </SideActionHeader>
      </View>

      {loading && (
        <View>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}

      {!loading && (!locations || locations.length == 0) && (
        <View style={{ alignItems: "center" }}>
          <Text>Cet objet n'a jamais été loué</Text>
        </View>
      )}
      {error && (
        <View style={{ alignItems: "center" }}>
          <Text>Impossible de charger les locations associées</Text>
        </View>
      )}

      <FlatList
        data={locations}
        refreshControl={
          <RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={refresh}
            onRefresh={refreshLocations}
          />
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              index % 2 == 0
                ? { backgroundColor: "#ffffff" }
                : { backgroundColor: "#f8f8f8" },
            ]}
            onPress={() => handleShowLocation(item)}
          >
            <LocationOfMaterialItem location={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingVertical: 40,
    width: "100%",
    alignItems: "center",
  },
});

export default MaterialDetailsScreen;
