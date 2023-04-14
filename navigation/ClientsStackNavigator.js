import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import ClientCreateScreen from "../screens/ClientCreateScreen";
import ClientDetailsScreen from "../screens/ClientDetailsScreen";
import ClientEditScreen from "../screens/ClientEditScreen";
import ClientScreen from "../screens/ClientScreen";
import { screenOptions } from "../theme/styles";

// Screen stack for settings tab
const ClientsStack = createNativeStackNavigator();

const ClientsStackNavigator = ({ navigation }) => {
  return (
    <ClientsStack.Navigator
      initialRouteName="ClientsList"
      screenOptions={screenOptions}
    >
      <ClientsStack.Screen
        name="ClientsList"
        component={ClientScreen}
        options={{
          title: "Clients",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateClient");
              }}
            >
              <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <ClientsStack.Screen name="CreateClient" component={ClientCreateScreen} />
      <ClientsStack.Screen name="EditClient" component={ClientEditScreen} />
      <ClientsStack.Screen
        name="DetailsClient"
        component={ClientDetailsScreen}
      />
    </ClientsStack.Navigator>
  );
};
export default ClientsStackNavigator;
