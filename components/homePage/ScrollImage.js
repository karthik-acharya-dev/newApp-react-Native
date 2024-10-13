import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

const ScrollImage = () => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://img.freepik.com/free-vector/flat-autumn-celebration-sale-banner-template_23-2149524881.jpg?t=st=1727407909~exp=1727411509~hmac=552d738c03867e829dd9f44b1ca89a7dd363b22ef1a7ebd00ec2d1b1480fb657&w=1060",
    "https://img.freepik.com/free-vector/minimal-architecture-project-sale-banner_23-2149521076.jpg?t=st=1727408050~exp=1727411650~hmac=929c50327cf611db029d2ddd51dde41d0678015f4b23af0657243ef4e734387f&w=1060",
    "https://img.freepik.com/free-vector/flat-12-12-shopping-day-social-media-cover-template_23-2149883338.jpg?t=st=1727407939~exp=1727411539~hmac=edcd17ca79399ab1fe8ac0fd86985dc643561b900cc25ecbefcc447bc728208a&w=1060",
    "https://img.freepik.com/free-vector/flat-supermarket-social-media-promo-template_23-2149372432.jpg?t=st=1727407991~exp=1727411591~hmac=dac980f2b938aa621f23b974399bdaa9f59fca07d93fafcdec8ef80417e78144&w=1380",
  ];

  // Automatic scrolling for images
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        scrollViewRef.current.scrollTo({
          x: nextIndex * (Dimensions.get("window").width * 0.8),
          animated: true,
        });
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex, images.length]);

  return (
    <View style={styles.imageScrollContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={200}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          setCurrentIndex(
            Math.floor(offsetX / (Dimensions.get("window").width * 0.8))
          );
        }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.scrollImage}
          />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  imageScrollContainer: {
    height: 200, // Adjust height as per your design
    marginTop: 20,
    backgroundColor: "#RRGGBBAA", // Background of the scroll section
    borderRadius: 10,
  },
  scrollImage: {
    width: Dimensions.get("window").width * 0.8,
    height: 200, // Adjust image height
    marginRight: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
export default ScrollImage;
