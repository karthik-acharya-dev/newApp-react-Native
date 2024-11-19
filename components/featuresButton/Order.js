import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

import SearchBar from "../homePage/SearchBar";
import { useNavigation } from "@react-navigation/native";
import Items from "./orderComponents/DummyItems";
import { useFavorites } from "../../context/FavoritesContext";
import { FontAwesome } from "@expo/vector-icons";
import { CartContext } from "../../context/CartContext";
import CategoryBrand from "./orderComponents/CategoryBrand";

const OrderPage = ({ navigation }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [favorites, setFavorites] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState("");

  const navigo = useNavigation();
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const handleFavoriteToggle = (item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedItem(item)}>
      {/* Item rendering */}
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => setSelectedImage(item)}>
          <Image
            source={{ uri: item.images[0] }}
            style={styles.itemImageSmall}
          />
        </TouchableOpacity>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={styles.itemMrp}>MRP: ₹{item.mrp}</Text>
              <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => handleFavoriteToggle(item)}>
                <FontAwesome
                  name={isFavorite(item.id) ? "heart" : "heart-o"} // Filled or empty heart based on favorite status
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
              style={styles.addToCartBtn}
              onPress={() => addToCart(item)}
            >
              <Text>Add to Cart</Text>
            </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const openMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      navigo.navigate("Menu");
    });
  };

  return (
    <View style={styles.container}>
      <CategoryBrand />
      <SearchBar openMenu={openMenu} />

      {Items.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 30 }}>
          No items available
        </Text>
      ) : (
        <FlatList
          data={Items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Floating Cart Button */}
      <TouchableOpacity
        style={styles.floatingCartBtn}
        onPress={() => navigation.navigate("Cart", { cartItems })}
      >
        <Text style={styles.cartIcon}>🛒</Text>
      </TouchableOpacity>

      {/* Floating Favorites Button */}
      <TouchableOpacity
        style={[styles.floatingCartBtn, { right: 80 }]} // Adjusting position
        onPress={() => navigation.navigate("Favorites", { favorites })}
      >
        <Text style={styles.heartFilled}>❤️</Text>
      </TouchableOpacity>

      {/* Image Modal */}
      {selectedImage && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.modalView}>
              <ScrollView horizontal={true} style={styles.scrollbox}>
                {selectedImage.images.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    style={styles.itemImageLarge}
                  />
                ))}
              </ScrollView>
              <Text style={styles.itemDescription}>
                {selectedImage.description}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedImage(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#EEEEEE",
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
  itemImageLarge: {
    width: 200,
    height: 200,
    margin: 5,
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
    marginRight: 10,
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
  addToCartBtn: {
    backgroundColor: "#f0c14b",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  floatingCartBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "yellow",
    borderColor: "orange",
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.34,
    shadowRadius: 3,
    elevation: 4,
  },
  cartIcon: {
    fontSize: 24,
    color: "#fff",
  },
  imageModalContainer: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  itemDescription: {
    color: "#333", // Use a softer black for a refined look
    marginTop: 15, // Adjust margin for balance
    fontSize: 16, // Slightly smaller for cleaner text
    marginVertical: 10, // Keep vertical margin for spacing between elements
    textAlign: "center", // Center-align the text
    fontWeight: "500", // Make the text slightly bold for emphasis
    lineHeight: 22, // Increase line height for better readability
    letterSpacing: 0.5, // Add some letter spacing for a cleaner look
    fontFamily: "System", // Optional: Set a system or custom font for better styling
  },

  closeButton: {
    backgroundColor: "#f2e01b",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 80,

    marginTop: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 30,
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerButton: {
    marginHorizontal: 10,
    padding: 10,
  },
  footerButtonText: {
    fontWeight: "bold",
    color: "#007bff",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  tableHeader: {
    fontWeight: "bold",
  },
  tableData: {
    fontWeight: "500",
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 5,
    width: 50,
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "#f0c14b",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  addToCartText: {
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    fontWeight: "bold",
  },
});

export default OrderPage;
