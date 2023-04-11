import { Logs } from "expo";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import locationService from "../api/locationService";
import LocationItem from "../components/LocationItem";

const LocationScreen = ({ navigation }) => {
  Logs.enableExpoCliLogging();

  const [locations, setLocations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const loadLocations = React.useCallback(async () => {
    try {
      const locations = await locationService.fetchAllLocations();
      setLocations(locations);
    } catch (error) {
      console.log("error ee", error)
      setError(true);
    }
    setLoading(false);
  }, [setLocations]);

  React.useEffect(() => {
    loadLocations();
  }, []);



  

  if (loading) {
    return <Text>Chargement des locations</Text>;
  }

  if (error) {
    return <Text>Erreur lors du chargement des ressources</Text>;
  }

  return (
    <View style={screenStyles.container}>
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <TouchableOpacity
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

export default LocationScreen;
