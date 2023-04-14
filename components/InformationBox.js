import { StyleSheet, Text, TouchableOpacity } from "react-native";

const InformationBox = ({ label, children, onTouch }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onTouch={onTouch}
      disabled={!onTouch}
    >
      {label && <Text style={styles.label}>{label}</Text>}

      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
  },
  label: {
    fontWeight: "bold",
  },
});

export default InformationBox;
