import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, Button, Text, View, StyleSheet, Image, TextInput, TouchableWithoutFeedback, Keyboard, Pressable, Dimensions } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchModal from '../components/modals/SearchModal.tsx';
import MorseCode from '../components/dots/MorseCode.tsx';
import Dot from '../components/dots/Dot.tsx';
import { morseCodeMap } from '../components/dots/MorseCodeMap.tsx';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

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

const { width, height } = Dimensions.get('window');

const Dummy2 = ({ route }) => {
  const navigation = useNavigation();
  const fontSize = width * 0.15;
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
  const [bgColor, setBgColor] = useState(COLORS.yellow);

  const [pressed, setPressed] = useState(false);
  const [padding, setPadding] = useState(10);

  const [sound, setSound] = useState();

  const [isDisabled, setIsDisabled] = useState(false);

  const [pressInWhileNextSymbol, setPressInWhileNextSymbol] = useState(false);

  const [timer, setTimer] = useState(0);
  const [clock, setClock] = useState(0);

  const [pressTimer, setPressTimer] = useState(0);

  const soundRef = useRef(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/beep.wav'),
        { shouldPlay: false, isLooping: true }
      );
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.playAsync();
        }
      });
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [volume]);
  
  let interval;
  let indexChangeTimer;
  useEffect(() => {
    if (codeSequenceIndex !== 0) {
      setClock(timer);
      interval = setInterval(() => {
        setClock(prevClock => {
          prevClock <= 0 && clearInterval(interval);
          return prevClock - 1;
        })
      }, 100);

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
    setPressTimer(0);
    clearTimeout(indexChangeTimer);
    clearInterval(interval);
  };

  useEffect(() => {
    resetStates();
  },[selectedItem]);

  const handlePress = () => {
    setIsPressed(true);
    setIsPressedIn(false);
    setTimeout(() => {
      setIsPressed(false);
    }, 30);
  };

  const handlePressIn = async () => {
    setIsPressedIn(true);
    setPressed(true);
    if (volume && soundRef.current && !pressed) {
      await soundRef.current.playAsync();
    }
  };

  const handlePressOut = async () => {
    setIsPressedIn(false);
    setPressed(false);
    if (volume && soundRef.current && pressed) {
      await soundRef.current.stopAsync();
    }
  };

  // useEffect(() => {
  //   console.log(morseCodeMap[letterPhrase[letterPhraseIndex]]);
  //   console.log(codeSequence);
  // },[codeSequence])

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
            <Text style={[styles.phraseText, { fontSize: fontSize }]}>{letterPhrase[letterPhraseIndex]}</Text>
            {(clock >= 1) && <Text>{clock}</Text>}
          </>
        }
        {(clock <= 0) && <><MorseCode
          phrase={letterPhrase}
          codeSequence={codeSequence}
          setCodeSequence={setCodeSequence}
          codeSequenceIndex={codeSequenceIndex}
          setCodeSequenceIndex={setCodeSequenceIndex}
          setLetterPhraseIndex={setLetterPhraseIndex}
          wordSpace={wordSpace}
          setWordSpace={setWordSpace}
          letterSpace={letterSpace}
          setLetterSpace={setLetterSpace}
          pressed={pressed}
          padding={padding}
          setPadding={setPadding}
          pressInWhileNextSymbol={pressInWhileNextSymbol}
          setPressInWhileNextSymbol={setPressInWhileNextSymbol}
          setIsDisabled={setIsDisabled}
          timer={timer}
          setTimer={setTimer}
          clock={clock}
          bgColor={bgColor}
          setBgColor={setBgColor}
          pressTimer={pressTimer}
          setPressTimer={setPressTimer}
          indexChangeTimer={indexChangeTimer}
        />
                    <Text style={{ marginTop: 5 }}>{pressTimer} ms</Text></>
        }
      </View>
      <View style={styles.middleView}>
        <Pressable style={{ paddingVertical: 20, marginLeft: 20 }} onPress={() => navigation.navigate('Dummy1')}>
          <IconIon
            name={'arrow-back'} 
            size={33} 
            color={'#ccc'} 
          />
        </Pressable>
        <Pressable style={{ paddingVertical: 10 }} onPress={() => resetStates()}>
          <IconFoundation 
            name={'refresh'} 
            size={39} 
            color={'#ccc'} 
          />
        </Pressable>
        <Pressable style={{ paddingVertical: 20 }} onPress={() => setVolume(!volume)}>
          <IconAwesome5
            name={volume ? 'volume-up' : 'volume-mute'} 
            size={33} 
            color={'#ccc'} 
          />
        </Pressable>
        <Pressable style={{ paddingVertical: 20, marginRight: 20 }} onPress={() => setModalVisible(true)}>
         <IconIon
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
          <Text style={{ color: (isPressedIn) ? 'rgba(255, 255, 255, 0)' : '#ccc', fontSize: 20 }}>TOUCH</Text>
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
  header: {
    backgroundColor: 'rgba(10, 10, 10, 0.15)',
    borderRadius: 50,
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.yellow,
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
    backgroundColor: COLORS.lightGrey,
    height: '50%',
    borderWidth: 4,
    borderColor: 'transparent'
  },
  pressed: {
    borderColor: '#fff',
    // backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  phraseText: {
    fontSize: '120%',
    fontWeight: '600',
    color: COLORS.grey
  },
  codeText: {
    fontSize: 45,
    color: COLORS.grey
  }
});

