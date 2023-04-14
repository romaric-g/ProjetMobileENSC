import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CircleButton = ({ onPress, iconName, type = "default" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.circleButton,
        type === "danger" && styles.circleButton__danger,
      ]}
    >
      <Ionicons style={{ flex: 0 }} name={iconName} size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleButton: {
    height: 60,
    width: 60,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  circleButton__danger: {
    backgroundColor: "#f57c56",
    borderColor: "#f4511e",
    color: "white",
  },
});

export default CircleButton;
