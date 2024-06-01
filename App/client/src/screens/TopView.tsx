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
  bgColor,
  letterPhrase,
  letterPhraseIndex,
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
  timeunit
}) => {
  const fontSize = width * 0.15;
  const interCharPause = timeunit * 3;
  const wordPause = timeunit * 7;

  useEffect(() => {
    generateMorseCode(letterPhrase, setCodeSequence);
  }, [letterPhrase]);

  useEffect(() => {
    if (codeSequenceIndex < codeSequence.length) {
      if (codeSequence[codeSequenceIndex] === '/') {
        setTimer(wordPause);
        indexChangeTimer = setTimeout(() => {
          setTimer(0);
          setCodeSequenceIndex(prev => prev+1);
          setLetterPhraseIndex(prev => prev+2);
          setWordIndex(prev => prev+1); 
        }, wordPause);
      } else if(codeSequence[codeSequenceIndex] === ' ') {
        setTimer(interCharPause);
        indexChangeTimer = setTimeout(() => {
          setTimer(0);
          setCodeSequenceIndex(prev => prev+1);
          setLetterPhraseIndex(prev => prev+1);
        }, interCharPause);
      } else {
        if (codeSequenceIndex-1 >= 0 
            && (codeSequence[codeSequenceIndex-1] !== '/' 
            && codeSequence[codeSequenceIndex-1] !== ' ')
          ) {
          setTimer(timeunit);
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
    <View style={[styles.topView, { backgroundColor: bgColor, paddingBottom: visible ? 0 : 0 }]}>
        {visible && <Text style={styles.codeText}>{letterMorse(letterPhrase[letterPhraseIndex])}</Text>}
        <Text style={[styles.phraseText, { fontSize: fontSize }]}>{letterPhrase[letterPhraseIndex]}</Text>
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
              timeunit={timeunit}
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
              timeunit={timeunit}
            /> : 
            <></>
          }
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

