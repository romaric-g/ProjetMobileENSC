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

const MaterialEditScreen = ({ navigation, route }) => {
  Logs.enableExpoCliLogging();

  const { material } = route.params;

  const [name, setName] = React.useState(material.nom);
  const [price, setPrice] = React.useState(material.prixParJour.toString());

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSaveMaterial = React.useCallback(async () => {
    setLoading(true);
    try {
      console.log("handleSaveMaterial");
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
      } else {
        console.log("ERROR SAVE");
      }
    } catch (error) {}
    setLoading(false);
  }, [name, price, material]);

  return (
    <View style={screenStyles.container}>
      <FormInput label="Nom de l'objet" value={name} setValue={setName} />
      <FormInput
        label="Prix par jour"
        value={price}
        setValue={setPrice}
        keyboardType="numeric"
      />
      <View style={screenStyles.buttonBox}>
        <Button title="Enregister" onPress={handleSaveMaterial} />
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
