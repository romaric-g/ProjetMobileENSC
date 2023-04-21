import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationListScreen from "../screens/LocationListScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import { screenOptions } from "../theme/styles";
import { Button, TouchableOpacity } from "react-native";
import LocationCreateScreen from "../screens/LocationCreateScreen";
import LocationEditScreen from "../screens/LocationEditScreen";
import { Text } from "react-native";

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
        component={LocationListScreen}
        options={{
          title: "Locations",
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
        name="EditLocation"
        component={LocationEditScreen}
      />
      <LocationStack.Screen
        name="DetailsLocation"
        component={LocationDetailsScreen}
      />
    </LocationStack.Navigator>
  );
};

export default LocationStackNavigator;
