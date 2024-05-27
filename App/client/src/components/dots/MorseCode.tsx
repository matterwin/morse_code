import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from '../../constants';
import Dot from './Dot.tsx';
import Dash from './Dash.tsx';
import { morseCodeMap, generateMorseCode } from './MorseCodeMap.tsx';

const MorseCode = ({ 
  phrase, 
  codeSequence, 
  setCodeSequence, 
  codeSequenceIndex, 
  setCodeSequenceIndex,
  setLetterPhraseIndex, 
  wordSpace,
  setWordSpace,
  letterSpace,
  setLetterSpace,
  pressed,
  padding,
  setPadding,
  pressInWhileNextSymbol,
  setPressInWhileNextSymbol,
  setIsDisabled,
  timer,
  setTimer,
  bgColor,
  setBgColor,
  pressTimer,
  setPressTimer,
  indexChangeTimer,
  soundRef,
  volume,
  setWordIndex
}) => {
  useEffect(() => {
    generateMorseCode(phrase, setCodeSequence);
  }, [phrase]);

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
    codeSequence[codeSequenceIndex] === '.' ? 
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
  );
};

export default MorseCode;

const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.grey
  },
  symbolContainer: {
    marginHorizontal: 2,
  },
});

