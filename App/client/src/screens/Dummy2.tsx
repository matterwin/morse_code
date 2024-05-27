import React, { useState, useEffect, useRef } from "react";
import { 
  SafeAreaView, 
  Button, 
  Text, 
  View, 
  StyleSheet,
  Image,
  TextInput, 
  TouchableWithoutFeedback,
  Keyboard, 
  Pressable, 
  Dimensions,
  Alert
} from "react-native";
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
import { letterMorse } from '../components/dots/MorseCodeMap.tsx';

const { width, height } = Dimensions.get('window');

const Dummy2 = ({ route }) => {
  const navigation = useNavigation();
  const fontSize = width * 0.15;
  const selectedItem  = route.params?.selectedItem.trim() || 'A'; 

  const [letterPhrase, setLetterPhrase] = useState('');
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

  const [pressTimer, setPressTimer] = useState(0);
  const [pauseTimer, setPauseTimer] = useState(0);

  const [word, setWord] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);

  const soundRef = useRef(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/bleep.mp3'),
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
  
  let timeout;
  let indexChangeTimer;
  let pressTimerInterval;
  useEffect(() => {
    if (codeSequenceIndex && codeSequenceIndex !== codeSequence.length) {
      const startTime = Date.now();

      const updateElapsedTime = () => { 
        const elapsedTime = Date.now() - startTime;
        setPauseTimer(elapsedTime);
      }; 

      pressTimerInterval = setInterval(updateElapsedTime, 1);

      timeout = setTimeout(() => {
        clearInterval(pressTimerInterval);
        setPauseTimer(0);
         if (volume) {
          soundRef.current.stopAsync();
        }
      }, timer);

      return () => {
        clearInterval(pressTimerInterval);
        clearTimeout(timeout);
      };
    }
  }, [timer, codeSequenceIndex]);

  const splitter = () => {
    const words = selectedItem.split(' ');
    setWord(words);
  };

  const resetStates = () => {
    console.log(selectedItem);
    setLetterPhrase(selectedItem || 'A');
    splitter();
    setWordIndex(0);
    setLetterPhraseIndex(0);
    setCodeSequenceIndex(0);
    setBgColor(COLORS.yellow);
    setPadding(10);
    setTimer(0);
    setPressTimer(0);
    setPauseTimer(0);
    clearTimeout(indexChangeTimer);
    clearTimeout(timeout);
    clearInterval(pressTimerInterval);
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
    if (volume && codeSequenceIndex !== codeSequence.length) {
      await soundRef.current.playAsync();
    }
    setIsPressedIn(true);
    setPressed(true);
  };

  const handlePressOut = async () => {
    if (volume) {
      await soundRef.current.pauseAsync();
    }
    setIsPressedIn(false);
    setPressed(false);
  };

  // useEffect(() => {
  //   console.log(morseCodeMap[letterPhrase[letterPhraseIndex]]);
  //   console.log(codeSequence);
  // },[codeSequence])

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="dark" translucent={true}/>
      <View style={[styles.topView, { backgroundColor: bgColor }]}>
        {wordSpace && !letterSpace && false &&
          <>
            <Text style={styles.phraseText}>word pause</Text>
          </>
        }
        {!wordSpace && letterSpace && false &&
          <>
            <Text style={styles.phraseText}>symbol pause</Text>
          </>
        }
        {!wordSpace && !letterSpace &&
          <>
            <Text style={styles.codeText}>{letterMorse(letterPhrase[letterPhraseIndex])}</Text>
            <Text style={[styles.phraseText, { fontSize: fontSize }]}>{letterPhrase[letterPhraseIndex]}</Text>
          </>
        }
        {(pauseTimer <= 0) && <><MorseCode
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
          bgColor={bgColor}
          setBgColor={setBgColor}
          pressTimer={pressTimer}
          setPressTimer={setPressTimer}
          indexChangeTimer={indexChangeTimer}
          soundRef={soundRef}
          volume={volume}
          setWordIndex={setWordIndex}
        />
        </>
        }
        {pauseTimer <= 0 && 1 && 
          <View style={styles.toppy}>
            <View style={styles.topRightText}>
              <Text style={styles.timerText}>{pressTimer} ms</Text>
            </View>
          </View>
        }
        {pauseTimer > 0 && 1 && 
          <View style={styles.toppy}>
            <View style={styles.topRightText}>
              <Text style={styles.timerText}>{pauseTimer} ms</Text>
            </View>
            <Text>pause</Text>
          </View>
        }
        {pauseTimer <= 0 && 1 && 
          <View style={styles.topLeftView}>
            <View style={styles.topRightText}>
              <Text style={styles.timerText}>{word[wordIndex]}</Text>
            </View>
          </View>
        }
      </View>
      <View style={styles.middleView}>
        <Pressable style={{ paddingVertical: 20, marginLeft: 20 }} onPress={() => navigation.navigate('Dummy1')}>
          <IconAwesome
            name={'arrow-left'} 
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
         <IconAwesome
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
    height: '40%',
    gap: 5,
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
  },
  phraseText: {
    fontSize: '120%',
    fontWeight: '600',
    color: COLORS.grey
  },
  codeText: {
    fontSize: 45,
    color: COLORS.grey
  },
  toppy: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end'
  },
  topLeftView: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  topRightText: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    padding: 5,
    borderRadius: 3,
  },
  timerText: {
    fontSize: 17,
  },
});

