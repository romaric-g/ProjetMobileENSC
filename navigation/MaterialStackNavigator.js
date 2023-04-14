import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialListScreen from "../screens/MaterialListScreen";
import MaterialDetailsScreen from "../screens/MaterialDetailsScreen";
import { screenOptions } from "../theme/styles";
import { TouchableOpacity } from "react-native";
import MaterialCreateScreen from "../screens/MaterialCreateScreen";
import MaterialEditScreen from "../screens/MaterialEditScreen";

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
        component={MaterialListScreen}
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
      <MaterialStack.Screen
        name="CreateMaterial"
        component={MaterialCreateScreen}
      />
      <MaterialStack.Screen
        name="EditMaterial"
        component={MaterialEditScreen}
      />
      <MaterialStack.Screen
        name="DetailsMaterial"
        component={MaterialDetailsScreen}
      />
    </MaterialStack.Navigator>
  );
};

export default MaterialStackNavigator;
