import React from "react";
import { Text, View } from "react-native";
import styles from "../theme/styles";

const LocationDetailsScreen = ({ navigation, route }) => {
  const { location } = route.params;
  console.log("item", location);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{location.materiel.nom}</Text>
      <Text>
        Louer par {location.client.prenom} {location.client.nom}
      </Text>
    </View>
  );
};

export default LocationDetailsScreen;
