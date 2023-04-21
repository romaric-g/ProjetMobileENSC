import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MaterialItem = ({ material }) => {
  return (
    <View style={componentStyles.container}>
      <Text style={componentStyles.name}>{material.nom}</Text>
      <Text style={componentStyles.price}>{material.prixParJour} € / jour</Text>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 0,
  },
  price: {
    fontSize: 14,
  },
});

export default MaterialItem;
