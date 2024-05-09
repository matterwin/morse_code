import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Dummy = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Dummy2', { selectedItem: 'A' });
  };

  return (
    <SafeAreaView>
      <Pressable onPress={handlePress}>
        <Text>pussy</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Dummy;
