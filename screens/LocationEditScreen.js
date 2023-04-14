import { Logs } from "expo";
import "moment/locale/fr";
import moment from "moment/moment";
import React from "react";
import { StyleSheet, View } from "react-native";
import SelecteurPeriode from "../components/SelecteurPeriode";
import ClientSelect from "./LocationCreateScreen/ClientSelect.js";
import MaterialSelect from "./LocationCreateScreen/MaterialSelect.js";
import RecapSection from "./LocationCreateScreen/RecapSection.js";
import locationService, { Location } from "../api/locationService";
import materialService from "../api/materialService";

moment.locale("fr");

const LocationEditScreen = ({ navigation, route }) => {
  const { location } = route.params;

  const [periode, setPeriode] = React.useState({
    startDate: moment(location.jourDebut).format(),
    endDate: moment(location.jourFin).format(),
  });
  const [client, setClient] = React.useState(location.client);
  const [material, setMaterial] = React.useState(location.materiel);

  const [periodError, setPeriodError] = React.useState();
  const [clientError, setClientError] = React.useState();
  const [materialError, setMaterialError] = React.useState();

  const handleSave = React.useCallback(async () => {
    setClientError(undefined);
    setMaterialError(undefined);
    setPeriodError(undefined);

    let error = false;

    if (!client || !client["id"]) {
      setPeriodError("Vous devez selectionner un locataire");
      error = true;
    }

    if (!material || !material["id"]) {
      setMaterialError("Vous devez selectionner le materiel à louer");
      error = true;
    }

    if (!periode || !periode.startDate) {
      setPeriodError("Vous devez selectionner une periode de location");
      error = true;
    }

    if (error) return;

    const clientId = client["id"];
    const materialId = material["id"];

    const start = moment(periode.startDate).format();
    const end = periode.endDate ? moment(periode.endDate).format() : start;

    const ok = await locationService.editLocationById(
      location.id,
      new Location({
        materielId: materialId,
        clientId: clientId,
        jourDebut: start,
        jourFin: end,
      })
    );

    if (ok) {
      console.log("GO BACK");

      navigation.navigate({
        name: "LocationsList",
      });
    } else {
      setPeriodError("Cette periode n'est plus disponible");
    }
  }, [client, material, periode]);

  return (
    <View style={screenStyles.container}>
      <SelecteurPeriode
        style={{ flex: 1 }}
        periode={periode}
        setPeriode={setPeriode}
      />
      <ClientSelect client={client} setClient={setClient} />
      <MaterialSelect material={material} setMaterial={setMaterial} />
      <RecapSection
        periode={periode}
        price={material ? material["prixParJour"] : undefined}
        onSave={handleSave}
      />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocationEditScreen;
