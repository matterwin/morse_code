import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from '../../constants';
import Dot from './Dot.tsx';
import Dash from './Dash.tsx';
import { morseCodeMap } from './MorseCodeMap.tsx';

const MorseCode = ({ phrase, codeSequence, setCodeSequence, codeSequenceIndex, setLetterPhraseIndex }) => {
  const generateMorseCode = (text) => {
    const sanitizedText = text.toUpperCase();
    let morseCodeSequence = '';
    for (let i = 0; i < sanitizedText.length; i++) {
      const char = sanitizedText[i];
      if (morseCodeMap[char]) {
        morseCodeSequence += morseCodeMap[char] + ' ';
      }
    }
    setCodeSequence(morseCodeSequence.trim());
  };

  useEffect(() => {
    generateMorseCode(phrase);
  }, [phrase]);

  useEffect(() => {
    if(codeSequence[codeSequenceIndex] === ' ') {
      setLetterPhraseIndex(prev => prev+1);
    }

  },[codeSequenceIndex]);

  return (
    codeSequence[codeSequenceIndex] === '.' ? <Dot /> : 
      codeSequence[codeSequenceIndex] === '-' ? <Dash /> : <></>
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

