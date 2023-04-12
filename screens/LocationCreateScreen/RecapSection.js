import moment from "moment";
import React from "react";
import { Button, Text, View } from "react-native";

const RecapSection = ({ periode, price, onSave }) => {
  const recapText = React.useMemo(() => {
    if (!periode.startDate) {
      return "Aucune date séléctionnée";
    } else if (periode.startDate && !periode.endDate) {
      return "Le " + moment(periode.startDate).format("DD MMMM");
    } else {
      start = moment(periode.startDate);
      end = moment(periode.endDate);
      return `Du ${start.format("DD MMMM")} au ${end.format("DD MMMM")}`;
    }
  }, [periode]);

  const totalPrice = React.useMemo(() => {
    start = moment(periode.startDate);
    end = moment(periode.endDate);

    if (price === undefined) return "-";

    if (!periode.startDate) {
      return 0;
    } else if (periode.startDate && !periode.endDate) {
      return price;
    } else {
      return (end.diff(start, "days") + 1) * price;
    }
  }, [periode, price]);

  return (
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
        <Button onPress={onSave} title="Enregister" />
      </View>
    </View>
  );
};

export default RecapSection;
