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
import styles from "../theme/styles";
import SideActionHeader from "../components/SideActionHeader";
import CircleButton from "../components/CircleButton";
import locationService from "../api/locationService";
import LocationClientItem from "./MaterialDetailsScreen/LocationClientItem.js";

const MaterialDetailsScreen = ({ navigation, route }) => {
  const { material } = route.params;

  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const fetchLocation = React.useCallback(async () => {
    const locations = await locationService.fetchAllLocations();

    return locations.filter((location) => {
      console.log(location.materielId, material.id);
      return location.materielId ? location.materielId == material.id : false;
    });
  }, [material]);

  const loadLocations = React.useCallback(async () => {
    setLoading(true);
    try {
      const locations = await fetchLocation();
      setLocations(locations);
    } catch (error) {
      console.log("error ee", error);
      setError(true);
    }
    setLoading(false);
  }, [fetchLocation]);

  const refreshLocations = React.useCallback(async () => {
    try {
      setRefresh(true);
      const locations = await fetchLocation();
      setLocations(locations);
    } catch (error) {
      console.log("error", error);
    }
    setRefresh(false);
  }, [fetchLocation]);

  React.useEffect(() => {
    loadLocations();
  }, []);

  const handleDelete = React.useCallback(() => {}, []);

  const handleEdit = React.useCallback(() => {
    console.log("Handle Edit");
    navigation.navigate("EditMaterial", {
      material: material,
    });
  }, []);

  return (
    <View>
      <View style={screenStyles.header}>
        <SideActionHeader
          leftAction={
            <CircleButton
              onPress={handleDelete}
              iconName="trash"
              type="danger"
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
            onPress={handleEdit}
          >
            <LocationClientItem location={item} />
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
