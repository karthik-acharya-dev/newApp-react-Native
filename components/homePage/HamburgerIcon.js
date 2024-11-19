import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Import icon library (Ionicons)

const HamburgerIcon = ({ openMenu }) => {
  return (
    <View>
      {/* Burger icon */}
      <TouchableOpacity style={styles.burgerIcon} onPress={openMenu}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
export default HamburgerIcon;
