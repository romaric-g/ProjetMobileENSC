import React from "react";
import { SectionList, FlatList, StyleSheet } from "react-native";
import { Text, View, Button } from "react-native";
import commonStyles from "../theme/styles";
import locationService from "../api/locationService";
import { Logs } from "expo";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationItem from "../components/LocationItem";
import { TouchableOpacity } from "react-native";

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
      setError(true);
    }
    setLoading(false);
  });

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
              navigation.navigate("Details", {
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
