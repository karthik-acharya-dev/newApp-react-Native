import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HamburgerIcon from "./HamburgerIcon";

const TopBar = ({ openMenu }) => {
  return (
    <LinearGradient
      colors={["#f2e01b", "gray"]} // Define gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 3, y: 0 }}
      style={styles.top}
    >
      <HamburgerIcon openMenu={openMenu} />
      <Text style={styles.title}>bConnect</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    height: 60, // Fixed height for the top bar
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18, // Define font size for the title
    fontWeight: "700", // Bold text
    color: "white", // White text color
    marginLeft: 10, // Add spacing next to the icon
  },
});

export default TopBar;
