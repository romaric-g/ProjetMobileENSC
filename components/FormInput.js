import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

/**
 * Champ de formulaire
 */
const FormInput = ({
  label,
  value,
  setValue,
  keyboardType,
  error,
  setError,
}) => {
  React.useEffect(() => {
    if (setError) {
      setError(undefined);
    }
  }, [value, setError]);

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
      {error && <Text style={screenStyles.errorMessage}>{error}</Text>}
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
  errorMessage: {
    color: "red",
  },
});

export default FormInput;
