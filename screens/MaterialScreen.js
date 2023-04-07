import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Logs } from "expo";
import { TouchableOpacity } from "react-native";
import materialService from "../api/materialService";
import MaterialItem from "../components/MaterialItem";

const MaterialScreen = ({ navigation, route }) => {
  Logs.enableExpoCliLogging();

  const [materials, setMaterials] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const [error, setError] = React.useState(false);

  const loadMaterials = React.useCallback(async () => {
    try {
      const materials = await materialService.fetchAllMaterials();
      setMaterials(materials);
    } catch (error) {
        console.log("error", error)
      setError(true);
    }
    setLoading(false);
  });

  const refreshMaterials = React.useCallback(async () => {
    try {
        setRefresh(true)
        const materials = await materialService.fetchAllMaterials();
        setMaterials(materials);
      } catch (error) {
        console.log("error", error)
      }
      setRefresh(false)
  })

  React.useEffect(() => {
    if (route.params?.material) {
        console.log("new material", route.params?.material)
        setMaterials(materials => [...materials, route.params?.material])
    }
  }, [route.params?.material, setMaterials]);

  React.useEffect(() => {
    loadMaterials();
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
        data={materials}
        refreshControl={
            <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={refresh}
                onRefresh={refreshMaterials} 
            />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailsMaterial", {
                material: item,
              });
            }}
          >
            <MaterialItem material={item} />
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

export default MaterialScreen;
