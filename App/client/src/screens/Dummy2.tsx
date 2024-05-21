import React, { useState, useEffect } from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, Pressable } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchModal from '../components/modals/SearchModal.tsx';
import MorseCode from '../components/dots/MorseCode.tsx';
import Dot from '../components/dots/Dot.tsx';
import { morseCodeMap } from '../components/dots/MorseCodeMap.tsx';
import { Audio } from 'expo-av';

const letterMorse = (text) => {
  if(text) {
    if(isAlphabetical(text) === true) {
      const c = text.toUpperCase();
      return morseCodeMap[c];
    } else { 
      return null;
    }
  }
};

function isAlphabetical(char) {
  return /[a-zA-Z]/.test(char);
}

const Dummy2 = ({ route }) => {
  const selectedItem  = route.params?.selectedItem || 'A'; 
  const [letterPhrase, setLetterPhrase] = useState(selectedItem);
  const [codeSequence, setCodeSequence] = useState('');
  const [codeSequenceIndex, setCodeSequenceIndex] = useState(0);
  const [letterPhraseIndex, setLetterPhraseIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [volume, setVolume] = useState(false);

  const [isPressed, setIsPressed] = useState(false);
  const [isPressedIn, setIsPressedIn] = useState(false);
  const [wordSpace, setWordSpace] = useState(false);
  const [letterSpace, setLetterSpace] = useState(false);
  const [bgColor, setBgColor] = useState('#ffd35c');

  const [pressed, setPressed] = useState(false);
  const [padding, setPadding] = useState(10);

  const [sound, setSound] = useState();

  const [isDisabled, setIsDisabled] = useState(false);

  const [pressInWhileNextSymbol, setPressInWhileNextSymbol] = useState(false);

  const [timer, setTimer] = useState(0);
  const [clock, setClock] = useState(0);

  useEffect(() => {
    if (codeSequenceIndex !== 0) {
      setClock(timer);
      let interval = setInterval(() => {
        setClock(prevClock => {
          prevClock <= 1 && clearInterval(interval);
          return prevClock - 1;
        })
      }, 250);

      return () => clearInterval(interval);
    }
  }, [timer, codeSequenceIndex]);

  const resetStates = () => {
    console.log(selectedItem);
    setLetterPhrase(route.params?.selectedItem || 'A')
    setLetterPhraseIndex(0);
    setCodeSequenceIndex(0);
    setBgColor('#ffd35c');
    setPadding(10);
    setTimer(0);
    setClock(0);
  };

  useEffect(() => {
    resetStates();
  },[selectedItem]);

  const handlePress = () => {
    // setCodeSequenceIndex(prev => prev+1);
    // if (!isDisabled) {
      setIsPressed(true);
      setIsPressedIn(false);
      setTimeout(() => {
        setIsPressed(false);
      }, 30);
    // }
  };

  const handlePressIn = async () => {
    /* if (!isDisabled) {  */
      if (volume) {
        playSound(); 
      }
      setIsPressedIn(true);
      setPressed(true);
    /* } */
  };

  const handlePressOut = () => {
    // if (!isDisabled) {
      setIsPressedIn(false);
      setPressInWhileNextSymbol(false);
      setPressed(false);
    // }
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/beep.wav'));
    setSound(sound);

    await sound.playAsync();
  }
  
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    console.log(morseCodeMap[letterPhrase[letterPhraseIndex]]);
    console.log(codeSequence);
  },[codeSequence])

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="dark" translucent={true}/>
      <View style={[styles.topView, { backgroundColor: bgColor }]}>
        {wordSpace && !letterSpace &&
          <>
            <Text style={styles.phraseText}>/</Text>
            {(clock >= 1) && <Text>{clock}</Text>}
          </>
        }
        {!wordSpace && letterSpace && 
          <>
            <Text style={styles.phraseText}>_</Text>
            {(clock >= 1) && <Text>{clock}</Text>}
          </>
        }
        {!wordSpace && !letterSpace &&
          <>
            <Text style={styles.codeText}>{letterMorse(letterPhrase[letterPhraseIndex])}</Text>
            <Text style={styles.phraseText}>{letterPhrase[letterPhraseIndex]}</Text>
            {(clock >= 1) && <Text>{clock}</Text>}
          </>
        }
        {(clock <= 0) && <MorseCode
          phrase={letterPhrase}
          codeSequence={codeSequence}
          setCodeSequence={setCodeSequence}
          codeSequenceIndex={codeSequenceIndex}
          setCodeSequenceIndex={setCodeSequenceIndex}
          setLetterPhraseIndex={setLetterPhraseIndex}
          setWordSpace={setWordSpace}
          setLetterSpace={setLetterSpace}
          setBgColor={setBgColor}
          pressed={pressed}
          padding={padding}
          setPadding={setPadding}
          pressInWhileNextSymbol={pressInWhileNextSymbol}
          setPressInWhileNextSymbol={setPressInWhileNextSymbol}
          setIsDisabled={setIsDisabled}
          timer={timer}
          setTimer={setTimer}
        />
        }
      </View>
      <View style={styles.middleView}>
        <Pressable style={{ paddingVertical: 20, marginLeft: 15 }} onPress={() => setVolume(!volume)}>
          <Icon 
            name={volume ? 'volume-high' : 'volume-mute'} 
            size={35} 
            color={'#ccc'} 
          />
        </Pressable>
        <Pressable style={{ paddingVertical: 20, marginRight: 15 }} onPress={() => setModalVisible(true)}>
         <Icon 
            name={'search'} 
            size={34} 
            color={'#ccc'} 
          />
        </Pressable>
      </View>
      <Pressable 
        style={[
          styles.bottomView, 
          isPressed && styles.pressed, 
          isPressedIn && { backgroundColor: 'rgba(255, 255, 255, 0.35)' }
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View>
          <Pressable onPress={() => setPadding(10)}>
          <Text style={{ color: '#ccc', fontSize: 20 }}>TAP HERE</Text>
          </Pressable>
        </View>
      </Pressable>
      <View style={{ display: (modalVisible) ? 'visible' : 'none' }}>
        <SearchModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      </View>
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
    justifyContent: 'space-between',
    gap: 15,
  },
  bottomView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a3a3a3',
    height: '50%',
    borderWidth: 2,
    borderColor: 'transparent'
  },
  pressed: {
    borderColor: '#fff',
    // backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  phraseText: {
    fontSize: 85,
    fontWeight: '600',
    color: COLORS.grey
  },
  codeText: {
    fontSize: 35,
    color: COLORS.grey
  }
});

