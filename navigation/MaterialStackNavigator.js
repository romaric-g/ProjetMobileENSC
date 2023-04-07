import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialScreen from "../screens/MaterialScreen";
import MaterialDetailsScreen from "../screens/MaterialDetailsScreen";
import { screenOptions } from "../theme/styles";
import { Button, TouchableOpacity } from "react-native";
import MaterialCreateScreen from "../screens/MaterialCreateScreen";

// Screen stack for home tab
const MaterialStack = createNativeStackNavigator();

const MaterialStackNavigator = ({ navigation }) => {
  return (
    <MaterialStack.Navigator
      initialRouteName="Materials"
      screenOptions={screenOptions}
    >
      <MaterialStack.Screen
        name="Materials"
        component={MaterialScreen}
        options={{
          title: "Materials",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateMaterial");
              }}
            >
              <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <MaterialStack.Screen name="CreateMaterial" component={MaterialCreateScreen} />
      <MaterialStack.Screen
        name="DetailsMaterial"
        component={MaterialDetailsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => alert("This is a button!")}>
              <Ionicons name="create-outline" size={32} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </MaterialStack.Navigator>
  );
};

export default MaterialStackNavigator;
