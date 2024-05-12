import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from '../../constants';

const Dot = () => {
  return(
    <View style={styles.dotView}>
    </View>
  );
}

export default Dot;

const styles = StyleSheet.create({
  dotView: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.grey
  },
});
