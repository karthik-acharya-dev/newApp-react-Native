import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";

const PayBill = () => {
  const qrCodeUri =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/444px-QR_code_for_mobile_English_Wikipedia.svg.png"; // Replace with your QR code image URL
  const upiId = "your-upi-id@bank";

  const copyToClipboard = () => {
    Clipboard.setString(upiId);
    Alert.alert("Copied", "UPI ID copied to clipboard!");
  };

  const downloadQrCode = async () => {
    const fileUri = FileSystem.documentDirectory + "qrCodeImage.jpg";

    try {
      // Download the image
      const response = await FileSystem.downloadAsync(qrCodeUri, fileUri);
      if (response.status === 200) {
        Alert.alert("Download", "QR code image downloaded successfully!");
      } else {
        Alert.alert("Error", "Failed to download the image.");
      }
    } catch (error) {
      console.error("Error downloading image:", error);
      Alert.alert("Error", "An error occurred while downloading the image.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Animatable.Text animation="fadeInDown" style={styles.header} delay={200}>
        Make a Payment
      </Animatable.Text>

      {/* QR Code */}
      <View style={styles.bgQr}>
        <Animatable.Image
          source={{ uri: qrCodeUri }}
          style={styles.qrCode}
          animation="bounceIn"
          delay={400}
        />
      </View>
      {/* UPI ID */}
      <View style={styles.upiContainer}>
        <Text style={styles.upiText}>UPI ID:</Text>
        <Text style={styles.upiId}>{upiId}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <Text style={styles.buttonText}>Copy</Text>
        </TouchableOpacity>
      </View>

      {/* Download QR Code Button */}
      <TouchableOpacity style={styles.downloadButton} onPress={downloadQrCode}>
        <Text style={styles.buttonText}>Download QR Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2e01b",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    fontStyle: "italic",
  },
  bgQr: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  qrCode: {
    width: 300,
    height: 300,
    backgroundColor: "white",
  },
  upiContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  upiText: {
    fontSize: 18,
    color: "#555",
  },
  upiId: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    color: "#007bff",
  },
  copyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  downloadButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PayBill;
