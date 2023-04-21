import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ClientItem = ({ client }) => {
  return (
    <View style={componentStyles.container}>
      <Text style={componentStyles.name}>
        {client.prenom} {client.nom}
      </Text>
      <Text style={componentStyles.nbLocations}></Text>
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
  nbLocations: {
    fontSize: 14,
  },
});

export default ClientItem;
