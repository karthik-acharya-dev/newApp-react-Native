// LowerFeature.js
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // For burger icon
import { useNavigation } from "@react-navigation/native";

const LowerFeature = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.lowerSection}>
      <TouchableOpacity style={styles.testing} color="#000">
        <Text style={styles.boxText}>BCONNECT TESTING</Text>
        <Text style={styles.boxChangeText}>change</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("Order")}
        >
          <Ionicons name="list-outline" size={24} color="#000" />
          <Text style={styles.boxText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("BuyAgain")}
        >
          <Ionicons name="cart-outline" size={24} color="#000" />
          <Text style={styles.boxText}>Buy Again</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("OrderList")}
        >
          <Ionicons name="clipboard-outline" size={24} color="#000" />
          <Text style={styles.boxText}>Order List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="basket-outline" size={24} color="#000" />
          <Text style={styles.boxText}>Cart</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Ionicons name="heart-outline" size={24} color="#000" />
          <Text style={styles.boxText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("Ledger")}
        >
          <Ionicons name="wallet-outline" size={24} color="#000" />
          <Text style={styles.boxText}>Ledger</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  lowerSection: {
    flex: 1,
    padding: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: "gray",
  },

  //lower section style here
  lowerSection: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    gap: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  testing: {
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  boxChangeText: {
    textDecorationLine: "underline",
    color: "blue",
    fontWeight: "400",
  },
  boxText: {
    fontSize: 14,
    color: "#2a9d8f",
    fontWeight: "600",
  },
});
export default LowerFeature;
