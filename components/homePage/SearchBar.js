import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon library (Ionicons)

const SearchBar = ({ openMenu }) => {
  const [searchText, setSearchText] = useState("");

  console.log(searchText);
  return (
    <View style={styles.topBar}>
      <View style={styles.searchBoxContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBox}
          placeholder="Search for your items"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      {/* Burger icon */}
      <TouchableOpacity style={styles.burgerIcon} onPress={openMenu}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBox: {
    flex: 1, // Ensure the TextInput takes up the remaining space
    fontSize: 16,
    color: "#333",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,

    backgroundColor: "#RRGGBBAA",
  },
});

export default SearchBar;
