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
  timer,
  setTimer,
  setBgColor,
  pressTimer,
  setPressTimer,
  indexChangeTimer,
  soundRef,
  volume,
  setWordIndex,
  timeunit,
  interCharPause,
  wordPause
}) => {
  const fontSize = width * 0.15;

  useEffect(() => {
    generateMorseCode(letterPhrase, setCodeSequence);
  }, [letterPhrase]);

  useEffect(() => {
    if (codeSequenceIndex >= 0 && codeSequenceIndex < codeSequence.length) {
      let sym = codeSequence[codeSequenceIndex];
      if (sym === '/') {
        setTimer(wordPause);
        indexChangeTimer = setTimeout(() => {
          setTimer(0);
          setCodeSequenceIndex(prev => prev+1);
          if (codeSequence[codeSequenceIndex+1] === '/') {
            setLetterPhraseIndex(prev => prev+1);
          } else {
            setLetterPhraseIndex(prev => prev+2);
          }
          setWordIndex(prev => prev+1); 
        }, wordPause);
      } else if(sym === ' ') {
        setTimer(interCharPause);
        indexChangeTimer = setTimeout(() => {
          setTimer(0);
          setCodeSequenceIndex(prev => prev+1);
          setLetterPhraseIndex(prev => prev+1);
        }, interCharPause);
      } else if (sym === '.' || sym === '-'){
        if (codeSequenceIndex >= 1 
            && (codeSequence[codeSequenceIndex-1] !== '/' 
            && codeSequence[codeSequenceIndex-1] !== ' ')
          ) {
          setTimer(timeunit);
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
      {visible && (pauseTimer === 0) && 
        <Text style={[styles.codeText, { marginTop: visible ? -40 : 0 }]}>{letterMorse(letterPhrase[letterPhraseIndex])}</Text>
      }
      {(pauseTimer === 0) && 
        <Text style={[styles.phraseText, { fontSize: fontSize }]}>{letterPhrase[letterPhraseIndex]}</Text>
      }
      {(pauseTimer === 0) && 
        <View style={{ opacity: visible ? 1 : 0 }}>
          {codeSequence[codeSequenceIndex] === '.' && (
            <Dot 
              pressed={pressed} 
              setCodeSequenceIndex={setCodeSequenceIndex}
              bgColor={bgColor}
              setBgColor={setBgColor}
              pressTimer={pressTimer}
              setPressTimer={setPressTimer}
              timeunit={timeunit}
              interCharPause={interCharPause}
            />
          )}
          {codeSequence[codeSequenceIndex] === '-' && (
            <Dash 
              pressed={pressed} 
              setCodeSequenceIndex={setCodeSequenceIndex}
              bgColor={bgColor}
              setBgColor={setBgColor}
              pressTimer={pressTimer}
              setPressTimer={setPressTimer}
              timeunit={timeunit}
              interCharPause={interCharPause}
            />
          )} 
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

