import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Make sure to install `expo install @expo/vector-icons`

const Ledger = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Right Logos */}
      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <FontAwesome name="download" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoSpacing}>
          <FontAwesome name="print" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Date Range */}
      <View style={styles.dateRangeContainer}>
        <Text style={styles.dateText}>01 January, 2024</Text>
        <Text>to</Text>
        <Text style={styles.dateText}>31 January, 2024</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>Particulars</Text>
        <Text style={styles.tableHeaderText}>Voucher Type</Text>
        <Text style={styles.tableHeaderText}>Voucher No</Text>
        <Text style={styles.tableHeaderText}>Dr</Text>
        <Text style={styles.tableHeaderText}>Cr</Text>
        <Text style={styles.tableHeaderText}>Balance</Text>
      </View>

      {/* The table body can be populated dynamically */}
      {/* Example table rows will go here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
    gap: 10,
  },
  logoSpacing: {
    marginLeft: 16,
  },
  dateRangeContainer: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 13,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",

    justifyContent: "space-between",
  },
  tableHeaderText: {
    borderWidth: 1,
    borderColor: "black",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    fontSize: 10,
  },
});

export default Ledger;
