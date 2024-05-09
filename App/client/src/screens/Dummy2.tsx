import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, Image } from "react-native";

const Dummy2 = ({ route }) => {
  const { selectedItem } = route.params;

  return (
    <SafeAreaView><Text>{selectedItem}</Text></SafeAreaView>
  );
}

export default Dummy2;

