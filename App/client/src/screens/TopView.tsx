// TopView.js
import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import MorseCode from '../components/dots/MorseCode.tsx';
import { COLORS } from '../constants';
import { letterMorse } from '../components/dots/MorseCodeMap.tsx';

const { width, height } = Dimensions.get('window');

const TopView = ({
  setWordSpace,
  setLetterSpace,
  bgColor,
  letterPhrase,
  letterPhraseIndex,
  wordSpace,
  letterSpace,
  visible,
  pauseTimer,
  codeSequence,
  codeSequenceIndex,
  setCodeSequence,
  setCodeSequenceIndex,
  setLetterPhraseIndex,
  word,
  wordIndex,
  pressed,
  padding,
  setPadding,
  pressInWhileNextSymbol,
  setPressInWhileNextSymbol,
  timer,
  setTimer,
  setBgColor,
  pressTimer,
  setPressTimer,
  indexChangeTimer,
  soundRef,
  volume,
  setWordIndex,
  modalVisible,
  setModalVisible,
}) => {
  const fontSize = width * 0.15;

  return (
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
          {visible && <Text style={styles.codeText}>{letterMorse(letterPhrase[letterPhraseIndex])}</Text>}
            <Text style={[styles.phraseText, { fontSize: fontSize }]}>{letterPhrase[letterPhraseIndex]}</Text>
          </>
        }
        {(pauseTimer === 0) && 
          <View style={{ opacity: visible ? 1 : 0 }}>
            <MorseCode
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
          </View>
        }
        {pauseTimer <= 0 && 1 && 
          <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.toppy}>
            <View style={styles.topRightText}>
              <Text style={styles.timerText}>{pressTimer} ms</Text>
            </View>
          </Pressable>
        }
        {pauseTimer > 0 && 1 && 
          <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.toppy}>
            <View style={styles.topRightText}>
              <Text style={styles.timerText}>{pauseTimer} ms</Text>
            </View>
            <Text>pause</Text>
          </Pressable>
        }
        {pauseTimer <= 0 && 1 && 
          <View style={styles.topLeftView}>
            <View style={styles.topRightText}>
              <Text style={styles.timerText}>{word[wordIndex]}</Text>
            </View>
          </View>
        }
      </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 5,
  },
  phraseText: {
    fontSize: '120%',
    fontWeight: '600',
    color: COLORS.grey,
  },
  codeText: {
    fontSize: 45,
    color: COLORS.grey,
  },
  toppy: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
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

export default TopView;

