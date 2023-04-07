import React from "react";
import { Text, View } from "react-native";
import styles from "../theme/styles";

const ClientDetailsScreen = ({ navigation, route }) => {
  const { material } = route.params;
  console.log("item", material);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{material.nom}</Text>

    </View>
  );
};

export default ClientDetailsScreen;
