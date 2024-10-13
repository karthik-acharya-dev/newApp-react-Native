import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const DueAmount = () => {
  return (
    <View style={styles.dueContainer}>
      <View style={styles.amountsContainer}>
        <View style={styles.amountRow}>
          <Text style={styles.label}>Total Due:</Text>
          <Text style={styles.amount}>
            ₹<Text style={styles.amountValue}>12,500</Text>
          </Text>
          {/* Example Amount */}
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.label}>Overdue Amount:</Text>
          <Text style={styles.overdueAmount}>
            ₹<Text style={styles.amountValue}>3,200</Text>
          </Text>
          {/* Example Amount */}
        </View>
      </View>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  dueContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 150,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 2,
    justifyContent: "space-between",
  },
  amountsContainer: {
    flex: 1,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#555",
    fontWeight: "600",
  },
  amount: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  overdueAmount: {
    fontSize: 18,
    color: "#e63946",
    fontWeight: "bold",
  },
  payButton: {
    height: 44,
    backgroundColor: "#2a9d8f",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  payButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DueAmount;
