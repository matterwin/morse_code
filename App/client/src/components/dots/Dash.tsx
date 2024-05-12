import React from "react";
import { SafeAreaView, Button, Text, View, StyleSheet } from "react-native";
import { COLORS } from '../../constants';

const Dash = () => {
  return(
    <View style={styles.dashView}>
    </View>
  );
}

export default Dash;

const styles = StyleSheet.create({
  dashView: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    backgroundColor: COLORS.grey
  },
});
