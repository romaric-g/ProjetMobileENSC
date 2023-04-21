import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../theme/styles";
import clientService from "../api/clientService";
import InformationBox from "../components/InformationBox";
import SideActionHeader from "../components/SideActionHeader";
import CircleButtonDanger from "../components/CircleButtonDanger";
import CircleButton from "../components/CircleButton";
import { Logs } from "expo";

const ClientDetailsScreen = ({ navigation, route }) => {
  Logs.enableExpoCliLogging();

  const { client } = route.params;

  const [clientDetails, setClientDetails] = React.useState();
  const [isError, setIsError] = React.useState();
  const [isLoading, setIsLoading] = React.useState();

  const loadDetails = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const clientDetails = await clientService.findClientById(client.id);
      setClientDetails(clientDetails);
    } catch (error) {
      console.log("error", error);
      setIsError(true);
    }
    setIsLoading(false);
  }, [client]);

  const locationCount = React.useMemo(() => {
    if (!clientDetails) return;
    return clientDetails.locations.length;
  }, [clientDetails]);

  React.useEffect(() => {
    loadDetails();
  }, []);

  const handleDelete = React.useCallback(async () => {
    const deleted = await clientService.deleteClientById(client.id);

    if (deleted) {
      navigation.navigate({
        name: "ClientsList",
        params: { deletedClientId: client.id },
        merge: true,
      });
    }

    return deleted;
  }, [client]);

  return (
    <View style={screenStyles.container}>
      <SideActionHeader
        leftAction={
          <CircleButtonDanger
            onDelete={handleDelete}
            iconName="trash"
            alertMessage="Voulez-vous vraiment supprimer ce client ?"
          />
        }
        rightAction={
          <CircleButton
            onPress={() => {
              navigation.navigate("EditClient", {
                client: client,
              });
            }}
            iconName="create"
          />
        }
      >
        <View style={screenStyles.userBox}>
          <Ionicons style={{ flex: 0 }} name={"person"} size={32} />
        </View>
      </SideActionHeader>
      <Text style={styles.pageTitle}>
        {client.prenom} {client.nom}
      </Text>
      {!isLoading ? (
        <Text>{locationCount} locations effectués</Text>
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}

      <View style={screenStyles.detailSection}>
        {client.telephone && (
          <InformationBox label="Téléphone">{client.telephone}</InformationBox>
        )}
        {client.email && (
          <InformationBox label="Email">{client.email}</InformationBox>
        )}
        {client.adresse && (
          <InformationBox label="Adresse">{client.adresse}</InformationBox>
        )}
      </View>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    flex: 1,
    alignItems: "center",
  },
  userBox: {
    width: 100,
    height: 100,
    borderRadius: 120,
    backgroundColor: "#ddd",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  priceText: {
    color: "black",
    fontWeight: "800",
    fontSize: 24,
  },
  title: {},
  detailSection: {
    marginTop: 40,
    width: "100%",
    gap: 10,
  },
});

export default ClientDetailsScreen;
