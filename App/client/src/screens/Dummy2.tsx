import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, Pressable } from "react-native";
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchModal from '../components/modals/SearchModal.tsx';
import MorseCode from '../components/dots/MorseCode.tsx';
import Dot from '../components/dots/Dot.tsx';
import { morseCodeMap } from '../components/dots/MorseCodeMap.tsx';

const Dummy2 = ({ route }) => {
  const selectedItem  = route.params?.selectedItem || 'A'; 
  const [letterPhrase, setLetterPhrase] = useState(selectedItem);
  const [codeSequence, setCodeSequence] = useState('');
  const [codeSequenceIndex, setCodeSequenceIndex] = useState(0);
  const [letterPhraseIndex, setLetterPhraseIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [volume, setVolume] = useState(true);

  const [isPressed, setIsPressed] = useState(false);
  const [isPressedIn, setIsPressedIn] = useState(false);
  const [wordSpace, setWordSpace] = useState(false);
  const [letterSpace, setLetterSpace] = useState(false);
  const [bgColor, setBgColor] = useState('#ffd35c');

  useEffect(() => {
    setLetterPhrase(route.params?.selectedItem || 'A')
    setLetterPhraseIndex(0);
    setCodeSequenceIndex(0);
    setBgColor('#ffd35c');
  },[selectedItem]);

  const handlePress = () => {
    setCodeSequenceIndex(prev => prev+1);
    setIsPressed(true);
    setIsPressedIn(false);
    setTimeout(() => {
      setIsPressed(false);
    }, 30);
  };

  useEffect(() => {
    console.log(codeSequence);
  },[codeSequence])

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.topView, { backgroundColor: bgColor }]}>
        {wordSpace && !letterSpace &&
          <>
            <Text>{morseCodeMap[letterPhrase[letterPhraseIndex]]}</Text>
            <Text style={styles.phraseText}>/</Text>
          </>
        }
        {!wordSpace && letterSpace && 
          <>
            <Text>{morseCodeMap[letterPhrase[letterPhraseIndex]]}</Text>
            <Text style={styles.phraseText}>_</Text>
          </>
        }
        {!wordSpace && !letterSpace &&
          <>
            <Text>{morseCodeMap[letterPhrase[letterPhraseIndex]]}</Text>
            <Text style={styles.phraseText}>{letterPhrase[letterPhraseIndex]}</Text>
          </>
        }
        <MorseCode
          phrase={letterPhrase}
          codeSequence={codeSequence}
          setCodeSequence={setCodeSequence}
          codeSequenceIndex={codeSequenceIndex}
          setCodeSequenceIndex={setCodeSequenceIndex}
          setLetterPhraseIndex={setLetterPhraseIndex}
          setWordSpace={setWordSpace}
          setLetterSpace={setLetterSpace}
          setBgColor={setBgColor}
        />
      </View>
      <View style={styles.middleView}>
        <Pressable style={{ paddingVertical: 20 }} onPress={() => setModalVisible(true)}>
         <Icon 
            name={'repeat'} 
            size={35} 
            color={'#ccc'} 
          />
        </Pressable>
        <Pressable style={{ paddingVertical: 20 }} onPress={() => setVolume(!volume)}>
          <Icon 
            name={volume ? 'volume-high' : 'volume-mute'} 
            size={35} 
            color={'#ccc'} 
          />
        </Pressable>
                <Pressable style={{ paddingVertical: 19 }} onPress={() => setModalVisible(true)}>
         <Icon 
            name={'search'} 
            size={34} 
            color={'#ccc'} 
          />
        </Pressable>
        <Pressable style={{ paddingVertical: 20 }} onPress={() => setModalVisible(true)}>
         <Icon 
            name={'arrow-undo'} 
            size={35} 
            color={'#ccc'} 
          />
        </Pressable>

        <Pressable style={{ paddingVertical: 20 }} onPress={() => setModalVisible(true)}>
         <Icon 
            name={'arrow-redo'} 
            size={35} 
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
  phraseText: {
    fontSize: 80,
    fontWeight: '600',
    color: COLORS.grey
  },
});

