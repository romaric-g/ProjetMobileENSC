import { Logs } from "expo";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import clientService from "../api/clientService";
import ClientItem from "../components/ClientItem";
import commonStyles from "../theme/styles";

const ClientScreen = ({ navigation, route }) => {
  Logs.enableExpoCliLogging();

  const [clients, setClients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const [error, setError] = React.useState(false);

  const loadClients = React.useCallback(async () => {
    try {
      const clients = await clientService.fetchAllClients();
      setClients(clients);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  });

  const refreshClients = React.useCallback(async () => {
    try {
      setRefresh(true);
      const clients = await clientService.fetchAllClients();
      setClients(clients);
    } catch (error) {
      console.log("error", error);
    }
    setRefresh(false);
  });

  React.useEffect(() => {
    if (route.params?.deletedClientId) {
      setClients((clients) => [
        ...clients.filter((m) => m.id != route.params?.deletedClientId),
      ]);
    }
  }, [route.params?.deletedClientId, setClients]);

  React.useEffect(() => {
    if (route.params?.client) {
      setClients((clients) => [...clients, route.params?.client]);
    }
  }, [route.params?.client, setClients]);

  React.useEffect(() => {
    loadClients();
  }, []);

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.container}>
        <Text>Erreur lors du chargement des clients</Text>
      </View>
    );
  }

  return (
    <View style={screenStyles.container}>
      <FlatList
        data={clients}
        refreshControl={
          <RefreshControl
            colors={["#9Bd35A", "#689F38"]}
            refreshing={refresh}
            onRefresh={refreshClients}
          />
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              index % 2 == 0
                ? { backgroundColor: "#ffffff" }
                : { backgroundColor: "#f8f8f8" },
            ]}
            onPress={() => {
              navigation.navigate("DetailsClient", {
                client: item,
              });
            }}
          >
            <ClientItem client={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ClientScreen;
