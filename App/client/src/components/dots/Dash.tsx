import React, { useState, useEffect } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { COLORS } from '../../constants';

const Dash = ({ pressed, padding, setPadding }) => {

  useEffect(() => {
    console.log(pressed);
    if (pressed) {
      const interval = setInterval(() => {
        setPadding(prevPadding => prevPadding + 1);
      }, 10);

      return () => clearInterval(interval);
    }
  }, [pressed]);

  return (
    <Pressable
      style={styles.dashView}
    >
      <View style={{ paddingVertical: 15, backgroundColor: 'green' }}>
        <View style={{ paddingRight: padding }} />
      </View>
    </Pressable>
  );
};

export default Dash;

const styles = StyleSheet.create({
  dashView: {
    paddingVertical: 15,
    paddingVertical: 0,
    // paddingHorizontal: 35,
    // paddingLeft: 35,
    width: 70,
    backgroundColor: COLORS.grey,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden'
  },
});


