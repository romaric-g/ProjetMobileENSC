import { Logs } from "expo";
import "moment/locale/fr";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import clientService, { Client } from "../api/clientService";
import FormInput from "../components/FormInput";

const ClientEditScreen = ({ navigation, client }) => {
  Logs.enableExpoCliLogging();

  const [nom, setNom] = React.useState(client.nom);
  const [prenom, setPrenom] = React.useState(client.prenom);
  const [telephone, setTelephone] = React.useState(client.telephone);
  const [email, setEmail] = React.useState(client.email);
  const [adresse, setAdresse] = React.useState(client.adresse);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSaveClient = React.useCallback(async () => {
    setLoading(true);
    try {
      const ok = await clientService.editClientById(
        new Client({
          nom: nom,
          prenom: prenom,
          telephone: telephone,
          email: email,
          adresse: adresse,
        })
      );

      const client = await clientService.findClientById(client.id);

      navigation.navigate({
        name: "ClientDetails",
        params: { client: client },
      });

      return;
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  }, [nom, prenom, telephone, email, adresse]);

  return (
    <View style={screenStyles.container}>
      <FormInput label="Nom" value={nom} setValue={setNom} />
      <FormInput label="Prenom" value={prenom} setValue={setPrenom} />
      <FormInput label="Telephone" value={telephone} setValue={setTelephone} />
      <FormInput label="Email" value={email} setValue={setEmail} />
      <FormInput label="Adresse" value={adresse} setValue={setAdresse} />

      <View style={screenStyles.buttonBox}>
        <Button
          title="Enregister"
          onPress={handleSaveClient}
          disabled={loading}
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

export default ClientEditScreen;
