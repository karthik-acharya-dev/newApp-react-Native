import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Install using `expo install @expo/vector-icons`
import { TouchableOpacity } from "react-native-gesture-handler";

const OrderList = () => {
  // Sample data for ordered items
  const [orders, setOrders] = useState([
    { id: 1, date: "01 Jan, 2024", total: 120.5, status: "Shipped", rating: 3 },
    {
      id: 2,
      date: "02 Jan, 2024",
      total: 75.0,
      status: "Delivered",
      rating: 5,
    },
    {
      id: 3,
      date: "03 Jan, 2024",
      total: 210.9,
      status: "Processing",
      rating: 4,
    },
  ]);

  // Function to handle updating the rating of an order
  const updateRating = (id, newRating) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, rating: newRating } : order
    );
    setOrders(updatedOrders);
  };

  // Function to render stars
  const renderStars = (rating, id) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => updateRating(id, i)}>
          <FontAwesome
            name={i <= rating ? "star" : "star-o"}
            size={20}
            color={i <= rating ? "gold" : "gray"}
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  // Function to render each card
  const renderOrderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        {/* Order Number and Date */}
        <View style={styles.orderHeader}>
          <Text style={styles.orderNumber}>ORDER NO: {item.id}</Text>
          <View>
            <Text style={styles.orderDate}>Date:</Text>
            <Text>{item.date}</Text>
          </View>
        </View>

        {/* Total and Ratings */}
        <View style={styles.orderDetails}>
          <Text style={styles.totalAmount}>
            Total: ${item.total.toFixed(2)}
          </Text>
          <View style={styles.ratingContainer}>
            <Text>RATINGS: </Text>
            <View style={styles.stars}>
              {renderStars(item.rating, item.id)}
            </View>
          </View>
        </View>

        {/* Horizontal Line */}
        <View style={styles.separator} />

        {/* Order Status */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={styles.orderStatus}>Order Status:</Text>
          <Text
            style={
              item.status === "Delivered" ? styles.green : styles.orderStatus
            }
          >
            {item.status}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={orders}
      renderItem={renderOrderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  green: {
    color: "green",
    fontWeight: "bold",
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderNumber: {
    fontWeight: "bold",
  },
  orderDate: {
    fontWeight: "bold",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  stars: {
    flexDirection: "row",
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  orderStatus: {
    fontWeight: "bold",
    color: "#555",
  },
});

export default OrderList;
