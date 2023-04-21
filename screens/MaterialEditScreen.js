import React from "react";
import { Button, StyleSheet } from "react-native";
import { View } from "react-native";
import { Logs } from "expo";
import "moment/locale/fr";
import materialService, { Material } from "../api/materialService";
import FormInput from "../components/FormInput";

const MaterialEditScreen = ({ navigation, route }) => {
  Logs.enableExpoCliLogging();

  const { material } = route.params;

  const [name, setName] = React.useState(material.nom);
  const [price, setPrice] = React.useState(material.prixParJour.toString());

  const [loading, setLoading] = React.useState(false);

  const [nameError, setNameError] = React.useState(false);
  const [priceError, setPriceError] = React.useState(false);

  const handleSaveMaterial = React.useCallback(async () => {
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

    setLoading(true);
    try {
      const ok = await materialService.editMaterialById(
        material.id,
        new Material({
          nom: name,
          prixParJour: Number(price),
          masquer: false,
        })
      );

      if (ok) {
        navigation.navigate({
          name: "Materials",
          params: { editMaterialId: material.id },
          merge: true,
        });
      }
    } catch (error) {}
    setLoading(false);
  }, [name, price, material]);

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
        <Button
          title="Enregister"
          disabled={loading}
          onPress={handleSaveMaterial}
        />
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

export default MaterialEditScreen;
