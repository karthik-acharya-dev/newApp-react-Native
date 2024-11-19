import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DueAmount = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.dueContainer}>
      <View style={styles.amountsContainer}>
        <View style={styles.amountRow}>
          <Text style={styles.amount}>
            ₹<Text style={styles.amountValue}>12,500</Text>
          </Text>
          <Text style={styles.label}>Total Due:</Text>
          {/* Example Amount */}
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.overdueAmount}>
            ₹<Text style={styles.amountValue}>3,200</Text>
          </Text>
          <Text style={styles.label}>Overdue Amount:</Text>
          {/* Example Amount */}
        </View>
      </View>
      <TouchableOpacity
        style={styles.payButton}
        onPress={() => navigation.navigate("Pay")}
      >
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountRow: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,

    width: "50%",
  },
  label: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  amount: {
    fontSize: 18,
    color: "orange",
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
