import { View, TextInput, Text, StyleSheet } from "react-native";

const FormInput = ({ label = "test", value, setValue, keyboardType }) => {
  return (
    <View style={screenStyles.container}>
      <Text style={screenStyles.label}>{label}</Text>
      <TextInput
        style={screenStyles.input}
        onChangeText={setValue}
        value={value}
        placeholder={label}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#666",
  },
});

export default FormInput;
