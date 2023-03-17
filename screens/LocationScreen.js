import React from "react";
import { FlatList } from "react-native";
import { Text, View, Button } from "react-native";
import styles from "../theme/styles";
import locationService from "../api/locationService";

const LocationScreen = ({ navigation }) => {

  const [locations, setLocations] = React.useState([])
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const loadLocations = React.useCallback(async () => {
    const locations = await locationService.fetchAllLocations()

    try {
      setLocations(locations)
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  })


  React.useEffect(() => {

    loadLocations()

  }, [])

  if (loading) {
    return <Text>Chargement des locations</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={locations}
        renderItem={({item}) => <LocationItem location={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default LocationScreen;