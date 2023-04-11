import React from "react";
import { Text, View, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from "react-native";
import { Logs } from "expo";
import clientService from "../api/clientService";

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
        console.log("error", error)
      setError(true);
    }
    setLoading(false);
  });

  const refreshClients = React.useCallback(async () => {
    try {
        setRefresh(true)
        const clients = await clientService.fetchAllClients();
        setClients(clients);
      } catch (error) {
        console.log("error", error)
      }
      setRefresh(false)
  })

  React.useEffect(() => {
    if (route.params?.client) {
        console.log("new client", route.params?.client)
        setClients(clients => [...clients, route.params?.client])
    }
  }, [route.params?.client, setClients]);

  React.useEffect(() => {
    loadClients();
  }, []);

  if (loading) {
    return <Text>Chargement des items</Text>;
  }

  if (error) {
    return <Text>Erreur lors du chargement des ressources</Text>;
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
        renderItem={({ item }) => (
          <Text>OUI</Text>
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
