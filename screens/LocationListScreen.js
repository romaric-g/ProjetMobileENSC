import { Logs } from "expo";
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
import commonStyles from "../theme/styles";
import LocationItem from "../components/LocationItem.js";
import { InternetContext } from "../context/InternetContext";
import { cacheDataObject, getCachedDataObject } from "../utils/storage";

const LocationListScreen = ({ navigation, route }) => {
  const { networkAvailable } = React.useContext(InternetContext);

  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const loadLocations = React.useCallback(async () => {
    try {
      if (networkAvailable) {
        // Chargement des locations via l'API
        const locations = await locationService.fetchAllLocations();
        setLocations(locations);
        await cacheDataObject("locations", locations);
      } else {
        // Chargement des locations via le cache
        const locations = await getCachedDataObject("locations");
        if (locations === null) {
          throw "pas de location en cache";
        }
        setLocations(locations);
      }
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }, [setLocations, networkAvailable]);

  const refreshLocations = React.useCallback(async () => {
    try {
      setRefresh(true);
      const locations = await locationService.fetchAllLocations();
      setLocations(locations);
    } catch (error) {}
    setRefresh(false);
  }, []);

  React.useEffect(() => {
    loadLocations();
  }, [networkAvailable]);

  // Si une location a été supprimé precedement, on l'a retire de la liste
  React.useEffect(() => {
    if (route.params?.deletedLocationId) {
      setLocations((locations) => [
        ...locations.filter((m) => m.id != route.params?.deletedLocationId),
      ]);
    }
  }, [route.params?.deletedLocationId, setLocations]);

  // Si une location vient d'etre ajouté precedement, on recharge la liste des locations
  React.useEffect(() => {
    if (route.params?.newLocationId) {
      refreshLocations();
    }
  }, [route.params?.newLocationId]);

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  if (error) {
    return (
      <View style={commonStyles.container}>
        <Text>Erreur lors du chargement des locations</Text>
      </View>
    );
  }

  return (
    <View style={screenStyles.container}>
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
            onPress={() => {
              navigation.navigate("DetailsLocation", {
                location: item,
              });
            }}
          >
            <LocationItem location={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocationListScreen;
