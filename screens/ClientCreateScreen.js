import { Logs } from "expo";
import "moment/locale/fr";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import clientService, { Client } from "../api/clientService";
import FormInput from "../components/FormInput";

const ClientCreateScreen = ({ navigation }) => {
  Logs.enableExpoCliLogging();

  const [nom, setNom] = React.useState();
  const [prenom, setPrenom] = React.useState();
  const [telephone, setTelephone] = React.useState();
  const [email, setEmail] = React.useState();
  const [adresse, setAdresse] = React.useState();

  const [loading, setLoading] = React.useState(false);

  const [nomError, setNomError] = React.useState(false);
  const [prenomError, setPrenomError] = React.useState(false);

  const handleCreateClient = React.useCallback(async () => {
    setNomError(undefined);
    setPrenomError(undefined);

    error = false;

    if (!nom) {
      setNomError("Vous devez saisir un nom");
      error = true;
    }
    if (!prenom) {
      setPrenomError("Vous devez saisir un prenom");
      error = true;
    }

    if (error) {
      return;
    }

    const client = new Client({
      nom: nom,
      prenom: prenom,
      telephone: telephone,
      email: email,
      adresse: adresse,
    });
    setLoading(true);
    try {
      const newClient = await clientService.postClient(client);

      navigation.navigate({
        name: "ClientsList",
        params: { client: clientService.toClient(newClient) },
        merge: true,
      });

      return;
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [nom, prenom, telephone, email, adresse]);

  return (
    <View style={screenStyles.container}>
      <FormInput
        label="Nom"
        value={nom}
        setValue={setNom}
        error={nomError}
        setError={setNomError}
      />
      <FormInput
        label="Prenom"
        value={prenom}
        setValue={setPrenom}
        error={prenomError}
        setError={setPrenomError}
      />
      <FormInput label="Telephone" value={telephone} setValue={setTelephone} />
      <FormInput label="Email" value={email} setValue={setEmail} />
      <FormInput label="Adresse" value={adresse} setValue={setAdresse} />

      <View style={screenStyles.buttonBox}>
        <Button
          title="Enregister"
          disabled={loading}
          onPress={handleCreateClient}
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

export default ClientCreateScreen;
