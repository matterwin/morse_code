import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../constants/index.tsx';

const TopViewSecond = ({ codeSequence, letterPhrase, bgColor }) => {
  return (
     <ScrollView contentContainerStyle={[styles.scrollViewContent, { backgroundColor: bgColor }]}>
      <View style={styles.container}>
        <Text style={styles.phraseText}>{letterPhrase}</Text>
        <Text style={styles.codeText}>{codeSequence}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  phraseText: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.grey,
  },
  codeText: {
    fontSize: 25,
    color: COLORS.grey,
  },
});

export default TopViewSecond;

