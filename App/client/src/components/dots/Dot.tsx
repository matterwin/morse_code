import React, { useState, useEffect, useRef } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { COLORS } from '../../constants';

const Dot = ({ pressed, padding, setPadding, setCodeSequenceIndex, pressInWhileNextSymbol }) => {
  const innerViewRef = useRef(null);
  const dashViewRef = useRef(null);
  const [innerWidth, setInnerWidth] = useState(0);
  const [dashWidth, setDashWidth] = useState(0);

  useEffect(() => {
    if (pressed && !pressInWhileNextSymbol) {
      const interval = setInterval(() => {
        setPadding(prevPadding => prevPadding + 5);
      }, 10);

      return () => clearInterval(interval);
    } else if (!pressed) {
      setPadding(10);
    }
  }, [pressed]);

  const onInnerLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setInnerWidth(width);
  };

  const onDashLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setDashWidth(width);
  };

  useEffect(() => {
    if (innerWidth && dashWidth) {
      console.log(`Inner view width: ${innerWidth}, Dash view width: ${dashWidth}`);
      if (innerWidth >= dashWidth) {
        setCodeSequenceIndex(prevCodeSequenceIndex => prevCodeSequenceIndex+1);
        console.log("Inner view width is greater than or equal to Dash view width.");
      }
    }
  }, [innerWidth, dashWidth]);

  return (
    <Pressable
      ref={dashViewRef}
      style={styles.dashView}
      onLayout={onDashLayout}
    >
      <View style={{ paddingVertical: 15, backgroundColor: '#007828'}}>
        <View
          ref={innerViewRef}
          style={{ paddingRight: padding }}
          onLayout={onInnerLayout}
        />
      </View>
    </Pressable>
  );
};

export default Dot;

const styles = StyleSheet.create({
  dashView: {
    paddingVertical: 15,
    paddingVertical: 0,
    // paddingHorizontal: 35,
    // paddingLeft: 35,
    width: 30,
    backgroundColor: COLORS.grey,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden'
  },
});


