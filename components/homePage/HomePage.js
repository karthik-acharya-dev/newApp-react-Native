// HomePage.js
import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import BottomBar from "./BottomBar";
import DueAmount from "./DueAmount";
import ScrollImage from "./ScrollImage";
import LowerFeature from "./LowerFeature";
import { useNavigation } from "@react-navigation/native";

const HomePage = ({ handleLogout, user }) => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position for slide

  const openMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("Menu");
    });
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.upperSection}>
          <SearchBar openMenu={openMenu} />
          <ScrollImage />
          <DueAmount />
        </View>
        <LowerFeature />
        <BottomBar user={user} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  upperSection: {
    backgroundColor: "#f2e01b",
    borderRadius: 20,
    overflow: "hidden",
    paddingBottom: 20,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  hamburger: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
});

export default HomePage;
