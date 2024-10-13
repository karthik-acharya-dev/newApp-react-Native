import React from "react";
import { Button, View, StyleSheet } from "react-native";

const AuthButton = ({ title, onPress, color = "#3498db" }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title={title} onPress={onPress} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 16,
  },
});

export default AuthButton;
