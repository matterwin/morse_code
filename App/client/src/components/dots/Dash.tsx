import React, { useState, useEffect, useRef } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { COLORS } from '../../constants';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const Dash = ({ pressed, padding, setPadding, setCodeSequenceIndex, pressInWhileNextSymbol }) => {
  const shake = useSharedValue(0);
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
      } else {
        if(!pressed) {
          startShake();
        }
      }
    }
  }, [innerWidth, dashWidth]);

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shake.value,
        },
      ],
    };
  });

  const startShake = () => {
    shake.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 50, easing: Easing.linear }),
        withTiming(0, { duration: 50, easing: Easing.linear })
      ),
      2, // Number of shakes
      true // Reverse the animation
    );
  };

  return (
    <Animated.View
      ref={dashViewRef}
      style={[styles.dashView, shakeStyle]}
      onLayout={onDashLayout}
      onTouchStart={() => startShake()}
    >
      <View style={{ paddingVertical: 15, backgroundColor: '#007828'}}>
        <View
          ref={innerViewRef}
          style={{ paddingRight: padding }}
          onLayout={onInnerLayout}
        />
      </View>
    </Animated.View>
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

