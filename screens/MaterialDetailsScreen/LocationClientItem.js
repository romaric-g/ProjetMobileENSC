import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Moment from "moment";

const LocationClientItem = ({ location }) => {
  const toDateFormat = React.useCallback((dt) => Moment(dt).format("DD MMMM"));

  return (
    <View style={componentStyles.container}>
      <View style={componentStyles.main}>
        <Text style={componentStyles.title}>
          Louer à {location?.client.prenom} {location?.client.nom}
        </Text>
      </View>
      <View>
        <Text style={componentStyles.period}>
          du {toDateFormat(location.jourDebut)} au{" "}
          {toDateFormat(location.jourFin)}
        </Text>
      </View>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  main: {},
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  period: {
    fontSize: 14,
  },
});

export default LocationClientItem;
