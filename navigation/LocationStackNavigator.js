import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationScreen from "../screens/LocationScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import { screenOptions } from "../theme/styles";
import { Button, TouchableOpacity } from "react-native";
import LocationCreateScreen from "../screens/LocationCreateScreen";

// Screen stack for home tab
const LocationStack = createNativeStackNavigator();

const LocationStackNavigator = ({ navigation }) => {
  return (
    <LocationStack.Navigator
      initialRouteName="Locations"
      screenOptions={screenOptions}
    >
      <LocationStack.Screen
        name="LocationsList"
        component={LocationScreen}
        options={{
          title: "LocationsList",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateLocation");
              }}
            >
              <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <LocationStack.Screen
        name="CreateLocation"
        component={LocationCreateScreen}
      />
      <LocationStack.Screen
        name="DetailsLocation"
        component={LocationDetailsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => alert("This is a button!")}>
              <Ionicons name="create-outline" size={32} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </LocationStack.Navigator>
  );
};

export default LocationStackNavigator;
