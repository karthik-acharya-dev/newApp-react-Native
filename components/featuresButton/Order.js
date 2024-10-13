import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import CheckBox from "react-native-checkbox";
import SearchBar from "../homePage/SearchBar";
import { useNavigation } from "@react-navigation/native";
import Items from "./orderComponents/DummyItems";
import { useFavorites } from "../../context/FavoritesContext";
import { FontAwesome } from "@expo/vector-icons"; // You can use any icon library
import { CartContext } from "../../context/CartContext";
const OrderPage = ({ navigation }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [favorites, setFavorites] = useState([]);
  // const [expandedItem, setExpandedItem] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  // const [search, setSearch] = useState("");
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const { cartItems, setCartItems } = useContext(CartContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState("");

  const navigo = useNavigation();
  const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position for slide
  // Simulate fetching categories from Tally ERP
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    // Replace this with your actual Tally ERP data fetching logic
    const fetchedCategories = [
      { id: "1", name: "Electronics" },
      { id: "2", name: "Apparel" },
      { id: "3", name: "Grocery" },
      { id: "4", name: "Furniture" },
      { id: "5", name: "Furniture" },
      { id: "6", name: "Furniture" },
      { id: "7", name: "Furniture" },
      { id: "8", name: "Furniture" },
      { id: "9", name: "Furniture" },
      { id: "10", name: "Furniture" },
      { id: "11", name: "Furniture" },
      { id: "12", name: "Furniture" },
      { id: "13", name: "Furniture" },
    ];
    setCategories(fetchedCategories);
  };

  const toggleCategory = (id) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNo = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    const selected = categories.filter((cat) => selectedCategories[cat.id]);
    console.log("Selected Categories:", selected);
    setModalVisible(false);
  };

  const handleFavoriteToggle = (item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };
  // const addToCart = (Items) => {
  //   setCartItems([...cartItems, Items]); // Add the clicked product to the cart
  // };

  const handleAddToCart = () => {
    const itemWithQty = { ...selectedItem, quantity };
    setCartItems([...cartItems, itemWithQty]); // Add the item with the specified quantity to the cart
    setSelectedItem(null); // Close the modal after adding to cart
  };
  const handleQuantityChange = (text) => {
    const qty = parseInt(text) || 1; // Ensure the quantity is a valid number and default to 1 if invalid
    setQuantity(qty);
  };
  const toggleDropdown = (type) => {
    setDropdownVisible(dropdownVisible === type ? null : type);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedItem(item)}>
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
            <View>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => toggleDropdown("brands")}
        >
          <Text style={styles.buttonText}>Brands</Text>
        </TouchableOpacity>
      </View>

      {/* Categories and Brands Dropdown */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            {/* Header */}
            <Text style={styles.modalTitle}>Categories</Text>
            <View style={styles.horizontalLine} />

            {/* Category List */}
            <ScrollView>
              {categories.map((category) => (
                <View style={styles.categoryItem}>
                  <CheckBox
                    label={false}
                    value={selectedCategories[category.id] || false}
                    onValueChange={() => toggleCategory(category.id)}
                  />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </View>
              ))}
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
              <TouchableOpacity onPress={handleNo} style={styles.footerButton}>
                <Text style={styles.footerButtonText}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleOk} style={styles.footerButton}>
                <Text style={styles.footerButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
      {/* Modal for item details */}
      {selectedItem && (
        <Modal transparent={true} visible={true} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.title}</Text>

              {/* Table for MRP and Price */}
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>MRP:</Text>
                <Text style={styles.tableData}>₹{selectedItem.mrp}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Price:</Text>
                <Text style={styles.tableData}>₹{selectedItem.price}</Text>
              </View>

              {/* Quantity Input */}
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>QTY:</Text>
                <TextInput
                  style={styles.quantityInput}
                  value={quantity.toString()}
                  onChangeText={handleQuantityChange}
                  keyboardType="numeric"
                />
              </View>

              {/* Total Price */}
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Total:</Text>
                <Text style={styles.tableData}>
                  ₹{(selectedItem.price * quantity).toFixed(2)}
                </Text>
              </View>

              {/* Add to Cart Button */}
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}
              >
                <Text style={styles.addToCartText}>ADD TO CART</Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedItem(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#f2e01b",
    borderRadius: 14,
    textAlign: "center",
    width: "49%",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
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
