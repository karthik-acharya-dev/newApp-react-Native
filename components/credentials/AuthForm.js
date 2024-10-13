import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "./InputField";
import AuthButton from "./AuthButton";

const AuthForm = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
}) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? "Sign In" : "Sign Up"}</Text>

      <InputField
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        secureTextEntry={false}
      />
      <InputField
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />

      {isLogin && <Text style={styles.forgetText}>Forget password ?</Text>}

      <AuthButton
        title={isLogin ? "Sign In" : "Sign Up"}
        onPress={handleAuthentication}
      />

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </View>
    </View>
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
  forgetText: {
    flex: 1,
    textAlign: "end",
    padding: 10,
    paddingBottom: 20,
    color: "red",
    fontWeight: "500",
    textAlign: "right",
  },
  bottomContainer: {
    marginTop: 20,
  },
  toggleText: {
    color: "#3498db",
    textAlign: "center",
    fontSize: 17,
  },
});

export default AuthForm;
