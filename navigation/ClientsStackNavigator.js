import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../theme/styles";
import ClientsScreen from "../screens/ClientsScreen";

// Screen stack for settings tab
const ClientsStack = createNativeStackNavigator();

const ClientsStackNavigator = () => {
  return (
    <ClientsStack.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
    >
      <ClientsStack.Screen name="Clients" component={ClientsScreen} />
    </ClientsStack.Navigator>
  );
};

export default ClientsStackNavigator;