import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AuthButton from "./AuthButton";
import MainPage from "../mainPage/MainPage";

const AuthenticatedView = ({ user, handleLogout }) => {
  return (
    // <View style={styles.authContainer}>
    //   <Text style={styles.title}>Welcome</Text>
    //   <Text style={styles.emailText}>{user.email}</Text>

    //   <AuthButton title="Logout" onPress={handleLogout} color="#e74c3c" />
    // </View>
    <MainPage handleLogout={handleLogout} user={user} />
  );
};

const styles = StyleSheet.create({
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 25,
    marginBottom: 16,
    textAlign: "center",
  },
  emailText: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default AuthenticatedView;
