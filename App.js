import React from "react";
import { StyleSheet, Text } from "react-native";
import TabNavigator from "./navigation/TabNavigator";
import { InternetProvider } from "./context/InternetContext";

export default function App() {
  return (
    <InternetProvider>
      <TabNavigator />
    </InternetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
