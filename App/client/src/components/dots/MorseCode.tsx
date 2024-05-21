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
  setWordSpace,
  setLetterSpace,
  setBgColor,
  pressed,
  padding,
  setPadding,
  pressInWhileNextSymbol,
  setPressInWhileNextSymbol,
  setIsDisabled,
  timer,
  setTimer
}) => {
  useEffect(() => {
    generateMorseCode(phrase, setCodeSequence);
  }, [phrase]);

  useEffect(() => {
    if (codeSequenceIndex < codeSequence.length) {
      setPadding(10);
      if (codeSequence[codeSequenceIndex] === '/') {
        setWordSpace(true);
        setTimer(7);
        setTimeout(() => {
          setWordSpace(false);
          setCodeSequenceIndex(prev => prev+1);
          setLetterPhraseIndex(prev => prev+2);
        }, 350);
      } else if(codeSequence[codeSequenceIndex] === ' ') {
        setLetterSpace(true);
        setTimer(15);
        setTimeout(() => {
          setLetterSpace(false);
          setCodeSequenceIndex(prev => prev+1);
          setLetterPhraseIndex(prev => prev+1);
        }, 150);
      } else {
        setTimer(2);
      }
    } else {
      if(codeSequence.length > 0) {
        setBgColor('#a3a3a3');
        setTimer(0);
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
      /> : 
      codeSequence[codeSequenceIndex] === '-' ? 
      <Dash 
        pressed={pressed} 
        padding={padding} 
        setPadding={setPadding}
        setCodeSequenceIndex={setCodeSequenceIndex}
        pressInWhileNextSymbol={pressInWhileNextSymbol}
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

