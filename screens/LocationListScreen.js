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
import LocationItem from "./LocationListScreen/LocationItem.js";
import commonStyles from "../theme/styles";

const LocationListScreen = ({ navigation, route }) => {
  Logs.enableExpoCliLogging();

  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const loadLocations = React.useCallback(async () => {
    try {
      const locations = await locationService.fetchAllLocations();
      setLocations(locations);
    } catch (error) {
      console.log("error ee", error);
      setError(true);
    }
    setLoading(false);
  }, [setLocations]);

  const refreshLocations = React.useCallback(async () => {
    try {
      setRefresh(true);
      const locations = await locationService.fetchAllLocations();
      setLocations(locations);
    } catch (error) {
      console.log("error", error);
    }
    setRefresh(false);
  });

  React.useEffect(() => {
    loadLocations();
  }, []);

  React.useEffect(() => {
    if (route.params?.deletedLocationId) {
      setLocations((locations) => [
        ...locations.filter((m) => m.id != route.params?.deletedLocationId),
      ]);
    }
  }, [route.params?.deletedLocationId, setLocations]);

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
