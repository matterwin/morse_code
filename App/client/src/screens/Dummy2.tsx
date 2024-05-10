import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const Dummy2 = ({ route }) => {
  const { selectedItem } = route.params || 'A'; 
  const [letterPhrase, setLetterPhrase] = useState(selectedItem);

  useEffect(() => {
    if(selectedItem === undefined) {
      setLetterPhrase('A');
    } else {
    setLetterPhrase(selectedItem);
    }
  },[selectedItem]);

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Text>You selected: {letterPhrase}</Text>
      </View>
        <View style={styles.middleView}>
          <TextInput
            placeholder='Enter phrase'
            placeholderTextColor={'#ccc'}
            autoCapitalize='none'
            style={styles.textInput}
            keyboardAppearance='dark'
            returnKeyType="search"
          />
        </View>
      <View style={styles.bottomView}>
        <View>
          <Text>Tap here</Text>
        </View>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default Dummy2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  topView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd35c',
    height: '40%',
  },
  middleView: {
    width: '100%',
    backgroundColor: COLORS.grey,
    padding: 25,
    paddingHorizontal: 15,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a3a3a3',
    height: '50%',
  },
});

