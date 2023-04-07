import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import ClientCreateScreen from "../screens/ClientCreateScreen";
import ClientDetailsScreen from "../screens/ClientDetailsScreen";
import ClientScreen from "../screens/ClientScreen";

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
      <ClientsStack.Screen
        name="DetailsClient"
        component={ClientDetailsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => alert("This is a button!")}>
              <Ionicons name="create-outline" size={32} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </ClientsStack.Navigator>
  );
};
export default ClientsStackNavigator;