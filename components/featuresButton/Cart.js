import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { CartContext } from "../../context/CartContext";

const Cart = ({ clearCart, placeOrder }) => {
  const { cartItems } = useContext(CartContext); // Access cartItems from context
  const [filteredItems, setFilteredItems] = useState([]);
  const totalAmount = filteredItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
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
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.itemMrp}>MRP: ₹{item.mrp}</Text>
                    <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={{ color: "white", fontSize: 10 }}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.notYet}>No items in the cart</Text>
      )}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.clearCartButton} onPress={clearCart}>
          <Text style={styles.clearCartText}>Clear Cart</Text>
        </TouchableOpacity>

        <Text style={styles.totalAmountText}>Total: ₹{totalAmount}</Text>

        <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  bottomContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  clearCartButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  clearCartText: {
    color: "#fff",
    fontSize: 16,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  placeOrderButton: {
    backgroundColor: "#14b14b",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 16,
  },
});
export default Cart;
