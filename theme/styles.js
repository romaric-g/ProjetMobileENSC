import { StyleSheet } from "react-native";

// Common styles
const commonStyles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  pageTitle: { fontSize: 28, paddingBottom: 10, fontWeight: 700 },
  h1: { fontSize: 28, paddingBottom: 10 },
  h2: { fontSize: 24, paddingBottom: 10 },
  h3: { fontSize: 20, paddingBottom: 10 },
  text: { fontSize: 18, paddingBottom: 10 },
});

// Common stack header options
export const screenOptions = {
  headerStyle: {
    backgroundColor: "#f4511e",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default commonStyles;
