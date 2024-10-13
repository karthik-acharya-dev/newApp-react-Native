import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Image,
  Alert,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ExpoClipboard from "expo-clipboard";

const CustomModal = ({ visible, onClose, content, name }) => {
  const copyToClipboard = async (content) => {
    await ExpoClipboard.setStringAsync(content);
    Alert.alert("Copied to Clipboard", content);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {name === "profile" ? (
            <View>
              <Text style={styles.modalText}>Profile</Text>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginBottom: 30,
                }}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.modalText}>Contact Us</Text>

              {/* Email Section */}
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => copyToClipboard("example@email.com")}
              >
                <Ionicons
                  name="mail-outline"
                  size={24}
                  color="#333"
                  style={styles.icon}
                />
                <Text style={styles.contactText}>example@email.com</Text>
              </TouchableOpacity>

              {/* Phone Section */}
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => copyToClipboard("9448386621")}
              >
                <Ionicons
                  name="call-outline"
                  size={24}
                  color="#333"
                  style={styles.icon}
                />
                <Text style={styles.contactText}>9448386621</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const CustomTabBarButton = ({ children, onPress }) => {
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity style={styles.floatingButtonContainer} onPress={onPress}>
      <Animated.View
        style={[styles.floatingButton, { transform: [{ scale: animation }] }]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const Tab = createBottomTabNavigator();

const BottomBar = ({ user }) => {
  const [modalVisibleProfile, setModalVisibleProfile] = useState(false);
  const [modalVisibleSearch, setModalVisibleSearch] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "call" : "call-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen
          name="Profile"
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); // Prevent the default behavior of rendering the screen
              setModalVisibleProfile(true); // Show the modal instead
            },
          }}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        >
          {() => null}
        </Tab.Screen>

        <Tab.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}>
                <Ionicons name="home" size={28} color="gray" />
              </CustomTabBarButton>
            ),
          }}
        >
          {() => (
            <View style={styles.centeredView}>
              <Text>Home Content</Text>
            </View>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Search"
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); // Prevent the default behavior of rendering the screen
              setModalVisibleSearch(true); // Show the modal instead
            },
          }}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="call-outline" size={size} color={color} />
            ),
          }}
        >
          {() => null}
        </Tab.Screen>
      </Tab.Navigator>

      {/* Modals */}
      <CustomModal
        visible={modalVisibleProfile}
        onClose={() => setModalVisibleProfile(false)}
        content={user}
        name="profile"
      />
      <CustomModal
        visible={modalVisibleSearch}
        onClose={() => setModalVisibleSearch(false)}
      />
    </>
  );
};

export default BottomBar;

// Styles
const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    width: "100%",
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  tabBar: {
    position: "relative",
    backgroundColor: "gray",
    marginLeft: "10%",
    marginRight: "10%",
    height: 60,
    flex: 1,
    width: "80%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  floatingButtonContainer: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#f2e01b",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    borderWidth: 1,
    borderColor: "#d4d5d8",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
