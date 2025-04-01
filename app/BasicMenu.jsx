import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Menu, Provider } from "react-native-paper";

export default function BasicMenu({ open, anchorEl, handleClose }) {

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const hadleClick = () => {
    console.log('Hello');  
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<TouchableOpacity onPress={openMenu}><Ionicons name="menu" size={24} color="#25292e" /></TouchableOpacity> }
        >
          <Menu.Item onPress={() => {}} title="Option 1" />
          <Menu.Item onPress={() => {}} title="Option 2" />
          <Menu.Item onPress={() => {}} title="Option 3" />
        </Menu>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
