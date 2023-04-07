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
      initialRouteName="Location"
      screenOptions={screenOptions}
    >
      <LocationStack.Screen
        name="Location"
        component={LocationScreen}
        options={{
          title: "Locations",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Create");
              }}
            >
              <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <LocationStack.Screen name="Create" component={LocationCreateScreen} />
      <LocationStack.Screen
        name="Details"
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
