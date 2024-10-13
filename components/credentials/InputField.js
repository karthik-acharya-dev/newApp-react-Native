import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputField = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    fontSize: 18,
  },
});

export default InputField;
