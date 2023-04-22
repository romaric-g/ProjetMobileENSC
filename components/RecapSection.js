import moment from "moment";
import React from "react";
import { Button, Text, View } from "react-native";

const RecapSection = ({ periode, periodError, price, onSave }) => {
  const [errorShow, setErrorShow] = React.useState(false);

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

  React.useEffect(() => {
    if (periodError) {
      setErrorShow(true);
    }
  }, [periodError]);

  React.useEffect(() => {
    setErrorShow(false);
  }, [periode]);

  return (
    <View
      style={{
        flex: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 30,
        backgroundColor: "white",
        borderColor: "black",
        marginTop: 2,
      }}
    >
      <View>
        {errorShow ? (
          <Text style={{ fontSize: 16, color: "red" }}>{periodError}</Text>
        ) : (
          <Text style={{ fontSize: 16 }}>{recapText}</Text>
        )}

        <Text style={{ fontSize: 20 }}>{totalPrice} €</Text>
      </View>
      <View>
        <Button onPress={onSave} title="Enregister" />
      </View>
    </View>
  );
};

export default RecapSection;
