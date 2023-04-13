import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import commonStyles from "../theme/styles";
import Moment from "moment";

const LocationItem = ({ location }) => {
  const toDateFormat = React.useCallback((dt) => Moment(dt).format("DD MMMM"));

  console.log("LOCS", location);

  return (
    <View style={componentStyles.container}>
      <View style={componentStyles.main}>
        <Text style={componentStyles.title}>{location.materiel.nom}</Text>
        <Text style={componentStyles.subtitle}>
          Louer par {location.client.prenom} {location.client.nom}
        </Text>
      </View>
      <View>
        <Text>du {toDateFormat(location.jourDebut)}</Text>
        <Text>au {toDateFormat(location.jourFin)}</Text>
      </View>
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
    fontSize: 18,
    fontWeight: "bold",
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
});

export default LocationItem;
