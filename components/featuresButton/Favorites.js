import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFavorites } from "../../context/FavoritesContext";
import { FontAwesome } from "@expo/vector-icons"; // You can use any icon library

const Favorites = () => {
  const { favorites } = useFavorites(); // Get the favorites array from context
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => setSelectedImage(item)}>
        <Image source={{ uri: item.images[0] }} style={styles.itemImageSmall} />
      </TouchableOpacity>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.itemMrp}>MRP: ₹{item.mrp}</Text>
            <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => addToCart(item)}
            >
              <Text style={{ color: "white" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.notYet}>No favorites added yet!</Text>
      ) : (
        <FlatList
          data={favorites} // Pass the favorites array
          keyExtractor={(item) => item.id.toString()} // Unique key for each item
          renderItem={renderItem} // Function to render each item
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 80,

    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  itemImageSmall: {
    width: 65,
    height: 65,
    borderRadius: 10,
  },
  itemInfo: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemMrp: {
    textDecorationLine: "line-through",
    color: "red",
  },
  itemPrice: {
    color: "green",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
  },
  heartOutline: {
    fontSize: 24,
    color: "gray",
  },
  heartFilled: {
    fontSize: 24,
    color: "red",
  },
  removeBtn: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  notYet: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 18,
    opacity: 0.5,
  },
});

export default Favorites;
