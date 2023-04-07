import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { Logs } from "expo";
import { SafeAreaView } from "react-native-safe-area-context";
import SelecteurPeriode from "../components/SelecteurPeriode";
import moment from "moment/moment";
import "moment/locale/fr";
moment.locale("fr");

const LocationCreateScreen = () => {
  Logs.enableExpoCliLogging();

  const [periode, setPeriode] = React.useState({
    startDate: undefined,
    endDate: undefined,
  });

  const recapText = React.useMemo(() => {
    if (!periode.startDate) {
      return "Aucun date séléctionné";
    } else if (periode.startDate && !periode.endDate) {
      return "Le " + moment(periode.startDate).format("DD MMMM");
    } else {
      start = moment(periode.startDate);
      end = moment(periode.endDate);
      return `Du ${start.format("DD MMMM")} au ${end.format("DD MMMM")}`;
    }
  }, [periode]);

  const totalPrice = React.useMemo(() => {
    price = 10;
    start = moment(periode.startDate);
    end = moment(periode.endDate);

    if (!periode.startDate) {
      return 0;
    } else if (periode.startDate && !periode.endDate) {
      return price;
    } else {
      return (end.diff(start, "days") + 1) * price;
    }
  }, [periode]);

  return (
    <View style={screenStyles.container}>
      <SelecteurPeriode
        style={{ flex: 1 }}
        periode={periode}
        setPeriode={setPeriode}
      />
      <TouchableOpacity style={{ flex: 0 }}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "white",
            borderColor: "black",
            marginTop: 2,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Locataire</Text>
          <Text style={{ fontSize: 16 }}>Romaric Gauzi</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 0 }}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "white",
            borderColor: "black",
            marginTop: 2,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Materiel</Text>
          <Text style={{ fontSize: 16 }}>Raquette</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingVertical: 30,
          backgroundColor: "white",
          borderColor: "black",
          marginTop: 2,
        }}
      >
        <View>
          <Text style={{ fontSize: 16 }}>{recapText}</Text>
          <Text style={{ fontSize: 20 }}>{totalPrice} €</Text>
        </View>
        <View>
          <Button title="Enregister" />
        </View>
      </View>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocationCreateScreen;
