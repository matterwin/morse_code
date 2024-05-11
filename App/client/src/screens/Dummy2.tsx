import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, Pressable } from "react-native";
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchModal from '../components/modals/SearchModal.tsx';

const Dummy2 = ({ route }) => {
  const { selectedItem } = route.params || 'A'; 
  const [letterPhrase, setLetterPhrase] = useState(selectedItem);
  const [modalVisible, setModalVisible] = useState(false);

  const [isPressed, setIsPressed] = useState(false);
  const [isPressedIn, setIsPressedIn] = useState(false);

  useEffect(() => {
    if(selectedItem === undefined) {
      setLetterPhrase('A');
    } else {
    setLetterPhrase(selectedItem);
    }
  },[selectedItem]);

  const handlePress = () => {
    setIsPressed(true);
    setIsPressedIn(false);
    setTimeout(() => {
      setIsPressed(false);
    }, 30);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Text style={{ fontSize: 32, }}>{letterPhrase}</Text>
      </View>
      <View style={styles.middleView}>
        <Pressable style={{ paddingVertical: 25, }} onPress={() => setModalVisible(true)}>
         <Icon 
            name={'caret-forward'} 
            size={25} 
            color={'#ccc'} 
          />
        </Pressable>
        <Pressable style={{ paddingVertical: 25 }} onPress={() => setModalVisible(true)}>
         <Icon 
            name={'search'} 
            size={25} 
            color={'#ccc'} 
          />
        </Pressable>
        <SearchModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      </View>
      <Pressable 
        style={[
          styles.bottomView, 
          isPressed && styles.pressed, 
          isPressedIn && { backgroundColor: 'rgba(255, 255, 255, 0.35)' }
        ]}
        onPress={handlePress}
        onPressIn={() => setIsPressedIn(true)}
        onPressOut={() => setIsPressedIn(false)}
      >
        <View>
          <Text style={{ color: '#ccc' }}>Tap here</Text>
        </View>
      </Pressable>
    </SafeAreaView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a3a3a3',
    height: '50%',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  pressed: {
    borderColor: '#ccc',
    // backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
});

