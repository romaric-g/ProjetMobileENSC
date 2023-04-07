import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { View } from "react-native";
import { Logs } from "expo";
import "moment/locale/fr";
import commonStyles from "../theme/styles";
import materialService, { Material } from "../api/materialService";


const LocationCreateScreen = ({ navigation }) => {
  Logs.enableExpoCliLogging();

  const [name, setName] = React.useState()
  const [price, setPrice] = React.useState()

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(false)

  const handleCreateMaterial = React.useCallback(async () => {
    material = new Material({
      nom: name,
      prixParJour: Number(price)
    })
    console.log("material", material)
    setLoading(true)
    try {
      const newMaterial = await materialService.createMaterial(material)
      
      navigation.navigate({
        name: "Materials",
        params: { material: materialService.toMaterial(newMaterial) },
        merge: true,
      })

      console.log("return back")

      return;
    } catch (error) {
     console.log("error", error)
    }
    setLoading(false)
  }, [name, price])


  return (
    <View style={screenStyles.container}>
      <Text style={commonStyles.pageTitle}>Ajouter un objet à louer</Text>
      <TextInput
        style={screenStyles.input}
        onChangeText={setName}
        value={name}
        placeholder="Nom de l'objet"
      />
      <TextInput
        style={screenStyles.input}
        onChangeText={setPrice}
        value={price}
        placeholder="Prix par jour"
        keyboardType="numeric"
      />
      <View>
        <Button title="Enregister" onPress={handleCreateMaterial}/>
      </View>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    height: 60,
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
  }
});

export default LocationCreateScreen;
