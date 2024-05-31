import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/index.tsx';

const HelloWorld = ({ codeSequence, letterPhrase, bgColor }) => {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text>{letterPhrase}</Text>
      <Text style={styles.codeText}>{codeSequence}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default HelloWorld;

