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
} from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MorseCode from '../components/dots/MorseCode.tsx';
import Dot from '../components/dots/Dot.tsx';
import { morseCodeMap, letterMorse } from '../components/dots/MorseCodeMap.tsx';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import ImageSlider from '../components/extra/ImageSlider.tsx';
import SettingsBottomSheet from '../components/bottomsheets/SettingsBottomSheet.tsx';
import ConfirmationBottomSheet from '../components/bottomsheets/ConfirmationBottomSheet.tsx';
import AlertModal from '../components/modals/AlertModal.tsx';

const { width, height } = Dimensions.get('window');

const Dummy2 = ({ route, item }) => {
  const navigation = useNavigation();
  const selectedItem  = item || route?.params?.selectedItem.trim() || 'A'; 

  const [letterPhrase, setLetterPhrase] = useState('');
  const [codeSequence, setCodeSequence] = useState('');
  const [codeSequenceIndex, setCodeSequenceIndex] = useState(0);
  const [letterPhraseIndex, setLetterPhraseIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [volume, setVolume] = useState(false);

  const [isPressed, setIsPressed] = useState(false);
  const [isPressedIn, setIsPressedIn] = useState(false);
  const [bgColor, setBgColor] = useState(COLORS.blue);

  const [pressed, setPressed] = useState(false);

  const [sound, setSound] = useState();

  const [timer, setTimer] = useState(0);

  const [pressTimer, setPressTimer] = useState(0);
  const [pauseTimer, setPauseTimer] = useState(0);

  const [word, setWord] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);

  const [visible, setVisible] = useState(true);

  const [snapIndexForSettings, setSnapIndexForSettings] = useState(-1);
  const [snapIndexForConfirmation, setSnapIndexForConfirmation] = useState(-1);

  const [wpm, setWpm] = useState(12);
  const [timeunit, setTimeunit] = useState(100);
  const [interCharPause, setInterCharPause] = useState(300);
  const [wordPause, setWordPause] = useState(700);

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
      if (volume && pressed) {
        soundRef.current.pauseAsync();
      }

      const updateElapsedTime = () => { 
        const elapsedTime = Date.now() - startTime;
        setPauseTimer(elapsedTime);
      }; 

      pressTimerInterval = setInterval(updateElapsedTime, 1);

      timeout = setTimeout(() => {
        clearInterval(pressTimerInterval);
        setPauseTimer(0);
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
    setLetterPhrase(selectedItem);
    splitter();
    setWordIndex(0);
    setLetterPhraseIndex(0);
    setCodeSequenceIndex(0);
    setBgColor(COLORS.blue);
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
    if (volume && pauseTimer === 0 && codeSequenceIndex !== codeSequence.length) {
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

  const changeVisibility = () => {
    setVisible(prev => !prev);
  };

  const rotation = useSharedValue(0);

  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  const startRotation = () => {
    rotation.value = withTiming(rotation.value + 360, {
      duration: 300,
      easing: Easing.linear,
    });
  };
  
  const bottomSheetRefForSettings = useRef<BottomSheet>(null);

  const openSettingsBottomSheet = () => {
    setSnapIndexForSettings(0);
  };

  return (
    <ConfirmationBottomSheet 
      snapIndex={snapIndexForConfirmation}
      setSnapIndex={setSnapIndexForConfirmation}
      setSnapIndexForSettings={setSnapIndexForSettings}
      bottomSheetRefForSettings={bottomSheetRefForSettings}
      setTimeunit={setTimeunit}
      setInterCharPause={setInterCharPause}
      setWordPause={setWordPause}
      setWpm={setWpm}
    >
      <SettingsBottomSheet 
        snapIndex={snapIndexForSettings}
        setSnapIndex={setSnapIndexForSettings}
        wpm={wpm}
        setWpm={setWpm} 
        setModalVisible={setModalVisible}
        setSnapIndexForConfirmation={setSnapIndexForConfirmation}
        bottomSheetRef={bottomSheetRefForSettings}
        setModalVisible={setModalVisible}
        timeunit={timeunit}
        setTimeunit={setTimeunit}
        interCharPause={interCharPause}
        setInterCharPause={setInterCharPause}
        wordPause={wordPause}
        setWordPause={setWordPause}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" translucent={true}/>
          <View style={styles.topView}>
            <View style={{ zIndex: 1, width: '100%'}}>
              {pauseTimer <= 0 && 
                <Pressable onPress={openSettingsBottomSheet} style={styles.toppy}>
                  <View style={styles.topRightText}>
                    <Text style={styles.timerText}>{pressTimer} ms</Text>
                  </View>
                </Pressable>
              }
              {pauseTimer > 0 && 
                <Pressable onPress={openSettingsBottomSheet} style={styles.toppy}>
                  <View style={styles.topRightText}>
                    <Text style={styles.timerText}>{pauseTimer} ms</Text>
                  </View>
                  <Text>pause</Text>
                </Pressable>
              }
              {pauseTimer <= 0 && 
                <View style={styles.topLeftView}>
                  <View style={styles.topRightText}>
                    <Text style={styles.timerText}>{word[wordIndex]}</Text>
                  </View>
                </View>
              }
              </View>
            <View>
              <ImageSlider
                bgColor={bgColor}
                letterPhrase={letterPhrase}
                letterPhraseIndex={letterPhraseIndex}
                visible={visible}
                pauseTimer={pauseTimer}
                codeSequence={codeSequence}
                codeSequenceIndex={codeSequenceIndex}
                setCodeSequence={setCodeSequence}
                setCodeSequenceIndex={setCodeSequenceIndex}
                setLetterPhraseIndex={setLetterPhraseIndex}
                word={word}
                wordIndex={wordIndex}
                pressed={pressed}
                timer={timer}
                setTimer={setTimer}
                setBgColor={setBgColor}
                pressTimer={pressTimer}
                setPressTimer={setPressTimer}
                indexChangeTimer={indexChangeTimer}
                soundRef={soundRef}
                volume={volume}
                setWordIndex={setWordIndex}
                wpm={wpm}
                timeunit={timeunit}
                interCharPause={interCharPause}
                wordPause={wordPause}
              />
            </View>
          </View>
          <View style={styles.middleView}>
            <View style={[styles.rowView, { marginLeft: 20, }]}>
              <Pressable style={{ paddingVertical: 20 }} onPress={() => navigation.navigate('Dummy1')}>
                <IconAwesome
                  name={'arrow-left'} 
                  size={33} 
                  color={'#ccc'} 
                />
              </Pressable>
              <Pressable
                style={styles.pressable}
                onPress={() => {
                  resetStates();
                  startRotation();
                }}
              >
                <Animated.View style={rotationStyle}>
                  <IconFoundation
                    name={'refresh'} 
                    size={39} 
                    color={'#ccc'} 
                  />
                </Animated.View>
              </Pressable>
            </View>
            <View style={[styles.rowView, { marginRight: 20 }]}>
              <Pressable style={{ paddingVertical: 20 }} onPress={() => setVolume(!volume)}>
                <IconAwesome
                  name={volume ? 'volume-up' : 'volume-off'} 
                  size={35} 
                  color={'#ccc'} 
                />
              </Pressable>
              <Pressable style={{ paddingVertical: 20 }} onPress={() => setVisible(!visible)}>
                <IconAwesome5
                  name={visible ? 'eye' : 'eye-slash'}
                  size={33} 
                  color={'#ccc'} 
                />
              </Pressable> 
              <Pressable style={{ paddingVertical: 20, }} onPress={openSettingsBottomSheet}>
               <IconIon
                  name={'settings-sharp'}
                  size={34} 
                  color={'#ccc'} 
                />
              </Pressable>
            </View>
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
            <AlertModal modalVisible={modalVisible} setModalVisible={setModalVisible} wpm={wpm}/>
          </View>
        </SafeAreaView>
      </SettingsBottomSheet>
    </ConfirmationBottomSheet>
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
  rowView: {
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
    height: '40%',
    borderWidth: 4,
    borderColor: 'transparent',
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

