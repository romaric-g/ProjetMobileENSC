import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import commonStyles from "../theme/styles";
import Moment from "moment";

const MaterialItem = ({ material }) => {
  const toDateFormat = React.useCallback((dt) => Moment(dt).format("DD MMMM"));

  return (
    <View style={componentStyles.container}>
        <Text>{material.nom}</Text>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  main: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
});

export default MaterialItem;
