import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg, { Circle, Line } from "react-native-svg";

export default function CustomAppBar() {
  return (
    <View style={styles.appBar}>
      <Image
        source={require("../assets/images/Access_Earth_Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
        <TouchableOpacity >
          <Ionicons name="menu" size={24} color="#25292e" />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  logo: {
    width: "40%",
    height: 40,
  },
 
});
