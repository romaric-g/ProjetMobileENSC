import { Logs } from "expo";
import "moment/locale/fr";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import clientService, { Client } from "../api/clientService";
import FormInput from "../components/FormInput";

const ClientEditScreen = ({ navigation, route }) => {
  const { client } = route.params;

  const [nom, setNom] = React.useState(client.nom);
  const [prenom, setPrenom] = React.useState(client.prenom);
  const [telephone, setTelephone] = React.useState(client.telephone);
  const [email, setEmail] = React.useState(client.email);
  const [adresse, setAdresse] = React.useState(client.adresse);

  const [loading, setLoading] = React.useState(false);

  const [nomError, setNomError] = React.useState(false);
  const [prenomError, setPrenomError] = React.useState(false);

  const handleSaveClient = async () => {
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

    setLoading(true);
    try {
      const ok = await clientService.editClientById(
        client.id,
        new Client({
          nom: nom,
          prenom: prenom,
          telephone: telephone,
          email: email,
          adresse: adresse,
        })
      );

      if (ok) {
        const newClient = await clientService.findClientById(client.id);

        navigation.navigate({
          name: "DetailsClient",
          params: { client: newClient },
        });

        return;
      } else {
        console.log("edit error ");
      }
    } catch (error) {
      console.log("ERROR ", error);
    }
    setLoading(false);
  };

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
