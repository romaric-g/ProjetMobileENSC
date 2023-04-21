import { Text, View } from "react-native";

const NoConnection = () => {
  return (
    <View
      style={{
        backgroundColor: "gray",
        height: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>
        Vous êtes actuellement hors connection
      </Text>
    </View>
  );
};

export default NoConnection;
