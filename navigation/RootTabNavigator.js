import React from "react";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LocationStackNavigator from "./LocationStackNavigator";
import ClientsStackNavigator from "./ClientsStackNavigator";
import MaterialStackNavigator from "./MaterialStackNavigator";

const Tab = createBottomTabNavigator();

const LOCATION_STACK = "Locations en cours"
const MATERIAL_STACK = "Materiels"
const CLIENT_STACK = "Clients"

const RootTabNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#f4511e" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Icons will be different if the tab is focused
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === LOCATION_STACK) {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === MATERIAL_STACK) {
              iconName = focused ? "pricetag" : "pricetag-outline";
            } else if (route.name === CLIENT_STACK) {
              iconName = focused ? "ios-list" : "ios-list-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          // Hiding tab navigator header to show only stack header
          headerShown: false,
        })}
      >
        <Tab.Screen name={LOCATION_STACK} component={LocationStackNavigator} />
        <Tab.Screen name={MATERIAL_STACK} component={MaterialStackNavigator} />
        <Tab.Screen name={CLIENT_STACK} component={ClientsStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootTabNavigator;
