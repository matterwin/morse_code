import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import MorseCode from '../components/dots/MorseCode.tsx';
import { COLORS } from '../constants';
import { letterMorse } from '../components/dots/MorseCodeMap.tsx';
import Dot from '../components/dots/Dot.tsx';
import Dash from '../components/dots/Dash.tsx';
import { morseCodeMap, generateMorseCode } from '../components/dots/MorseCodeMap.tsx';

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
  useEffect(() => {
    generateMorseCode(letterPhrase, setCodeSequence);
  }, [letterPhrase]);

  useEffect(() => {
    if (codeSequenceIndex < codeSequence.length) {
      if (codeSequence[codeSequenceIndex] === '/') {
        setWordSpace(true);
        setTimer(700);
        indexChangeTimer = setTimeout(() => {
          setTimer(0);
          setCodeSequenceIndex(prev => prev+1);
          setLetterPhraseIndex(prev => prev+2);
          setWordIndex(prev => prev+1); 
        }, 700);
      } else if(codeSequence[codeSequenceIndex] === ' ') {
        setLetterSpace(true);
        setTimer(300);
        indexChangeTimer = setTimeout(() => {
          setTimer(0);
          setCodeSequenceIndex(prev => prev+1);
          setLetterPhraseIndex(prev => prev+1);
        }, 300);
      } else {
        setLetterSpace(false);
        setWordSpace(false);
        if (codeSequenceIndex-1 >= 0 && (codeSequence[codeSequenceIndex-1] !== '/' && codeSequence[codeSequenceIndex-1] !== ' ')) {
          setTimer(100);
        } else {
          console.log("new letter");
        }
      }
    } else {
      if(codeSequence.length > 0) {
        setBgColor(COLORS.lightGrey);
        setPressTimer(0);
        if (volume) {
          soundRef.current.pauseAsync();
        }
      }
    }
  },[codeSequenceIndex]);

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
          {codeSequence[codeSequenceIndex] === '.' ? 
            <Dot 
              pressed={pressed} 
              padding={padding} 
              setPadding={setPadding}
              setCodeSequenceIndex={setCodeSequenceIndex}
              pressInWhileNextSymbol={pressInWhileNextSymbol}
              bgColor={bgColor}
              setBgColor={setBgColor}
              pressTimer={pressTimer}
              setPressTimer={setPressTimer}
            /> : 
            codeSequence[codeSequenceIndex] === '-' ? 
            <Dash 
              pressed={pressed} 
              padding={padding} 
              setPadding={setPadding}
              setCodeSequenceIndex={setCodeSequenceIndex}
              pressInWhileNextSymbol={pressInWhileNextSymbol}
              bgColor={bgColor}
              setBgColor={setBgColor}
              pressTimer={pressTimer}
              setPressTimer={setPressTimer}
            /> : 
            <></>
          }
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

