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
  setPressInWhileNextSymbol
}) => {
  useEffect(() => {
    generateMorseCode(phrase, setCodeSequence);
  }, [phrase]);

  useEffect(() => {
    if (codeSequenceIndex < codeSequence.length) {
      setPadding(10);
      if (pressed) {
        setPressInWhileNextSymbol(true);
      }
      if (codeSequence[codeSequenceIndex] === '/') {
        setWordSpace(true);
        setTimeout(() => {
          setWordSpace(false);
          setCodeSequenceIndex(prev => prev+1);
          setLetterPhraseIndex(prev => prev+2);
        }, 350);
      } else if(codeSequence[codeSequenceIndex] === ' ') {
        setLetterSpace(true);
        setTimeout(() => {
          setLetterSpace(false);
          setCodeSequenceIndex(prev => prev+1);
          setLetterPhraseIndex(prev => prev+1);
        }, 150);
      } else {
        // do timeout for changing between symbols of 1 letter 
        // setTimeout(() => {
        //   setLetterSpace(false);
        //   setCodeSequenceIndex(prev => prev+1);
        //   setLetterPhraseIndex(prev => prev+1);
        // }, 50);
      }
    } else {
      if(codeSequence.length > 0) {
        setBgColor('#a3a3a3');
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

