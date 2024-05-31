// HelloWorld.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelloWorld = ({ codeSequence, letterPhrase }) => {
  return (
    <View style={styles.container}>
      <Text> {letterPhrase} </Text>
      <Text style={styles.text}>{codeSequence}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default HelloWorld;

