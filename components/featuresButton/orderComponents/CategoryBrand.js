import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import CheckBox from "react-native-checkbox";

const CategoryBrand = () => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedBrands, setSelectedBrands] = useState({});
  const [listType, setListType] = useState(""); // New state to track whether we show categories or brands
  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = () => {
    const fetchedCategories = [
      { id: "1", name: "Electronics" },
      { id: "2", name: "Apparel" },
      { id: "3", name: "Grocery" },
      { id: "4", name: "Furniture" },
      { id: "5", name: "Grocery" },
      { id: "6", name: "Furniture" },
      { id: "7", name: "Furniture" },
      { id: "8", name: "Grocery" },
      { id: "9", name: "Furniture" },
    ];
    setCategories(fetchedCategories);
  };

  const fetchBrands = () => {
    const fetchedBrands = [
      { id: "1", name: "Brand A" },
      { id: "2", name: "Brand B" },
      { id: "3", name: "Brand C" },
      { id: "4", name: "Brand D" },
    ];
    setBrands(fetchedBrands);
  };

  const toggleCategory = (id) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleBrand = (id) => {
    setSelectedBrands((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNo = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    const selected =
      listType === "categories"
        ? categories.filter((cat) => selectedCategories[cat.id])
        : brands.filter((brand) => selectedBrands[brand.id]);
    console.log("Selected:", selected);
    setModalVisible(false);
  };

  const openModal = (type) => {
    setListType(type); // Set whether to show categories or brands
    setModalVisible(true);
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openModal("categories")}
        >
          <Text style={styles.buttonText}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openModal("brands")}
        >
          <Text style={styles.buttonText}>Brands</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              {listType === "categories" ? "Categories" : "Brands"}
            </Text>
            <View style={styles.horizontalLine} />

            <ScrollView style={styles.scrollableList}>
              {(listType === "categories" ? categories : brands).map((item) => (
                <View style={styles.listItem} key={item.id}>
                  <CheckBox
                    label={false}
                    value={
                      listType === "categories"
                        ? selectedCategories[item.id]
                        : selectedBrands[item.id]
                    }
                    onValueChange={() =>
                      listType === "categories"
                        ? toggleCategory(item.id)
                        : toggleBrand(item.id)
                    }
                  />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>

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
    </View>
  );
};
const styles = StyleSheet.create({
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
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    maxHeight: "50%", // Fixed height
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 16,
  },
  scrollableList: {
    maxHeight: 200, // Fixed height for scrollable list
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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
export default CategoryBrand;
