import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationScreen from "../screens/LocationScreen";
import LocationDetailsScreen from "../screens/LocationDetailsScreen";
import { screenOptions } from "../theme/styles";

// Screen stack for home tab
const LocationStack = createNativeStackNavigator();

const LocationStackNavigator = () => {
  return (
    <LocationStack.Navigator initialRouteName="Location" screenOptions={screenOptions}>
      <LocationStack.Screen
        name="Location"
        component={LocationScreen}
        options={{ title: "Locations" }}
      />
      <LocationStack.Screen name="Details" component={LocationDetailsScreen} />
    </LocationStack.Navigator>
  );
};

export default LocationStackNavigator;