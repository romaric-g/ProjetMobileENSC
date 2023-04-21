import React from "react";
import {
  ActionSheetIOS,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { Logs } from "expo";
import "moment/locale/fr";
import commonStyles from "../theme/styles";
import materialService, { Material } from "../api/materialService";
import FormInput from "../components/FormInput";

const MaterialCreateScreen = ({ navigation }) => {
  Logs.enableExpoCliLogging();

  const [name, setName] = React.useState();
  const [price, setPrice] = React.useState();

  const [loading, setLoading] = React.useState(false);

  const [nameError, setNameError] = React.useState(false);
  const [priceError, setPriceError] = React.useState(false);

  const handleCreateMaterial = React.useCallback(async () => {
    setNameError(undefined);
    setPriceError(undefined);

    let error = false;

    if (!name) {
      setNameError("Vous devez saisir un nom");
      error = true;
    }

    if (!price) {
      setPriceError("Vous devez définir un prix");
      error = true;
    }

    if (error) {
      return;
    }

    const material = new Material({
      nom: name,
      prixParJour: Number(price),
    });
    setLoading(true);
    try {
      const { json, ok } = await materialService.createMaterial(material);

      if (ok) {
        navigation.navigate({
          name: "Materials",
          params: { material: materialService.toMaterial(json) },
          merge: true,
        });
      }

      return;
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  }, [name, price]);

  return (
    <View style={screenStyles.container}>
      <FormInput
        label="Nom de l'objet"
        value={name}
        setValue={setName}
        error={nameError}
        setError={setNameError}
      />
      <FormInput
        label="Prix par jour"
        value={price}
        setValue={setPrice}
        keyboardType="numeric"
        error={priceError}
        setError={setPriceError}
      />
      <View style={screenStyles.buttonBox}>
        <Button title="Enregister" onPress={handleCreateMaterial} />
      </View>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonBox: {
    marginTop: 20,
  },
});

export default MaterialCreateScreen;
