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

const Dash = ({ pressed, padding, setPadding, setCodeSequenceIndex, pressInWhileNextSymbol, timer, clock, bgColor, setBgColor }) => {
  const shake = useSharedValue(0);
  const innerViewRef = useRef(null);
  const dashViewRef = useRef(null);
  const [innerWidth, setInnerWidth] = useState(0);
  const [dashWidth, setDashWidth] = useState(0);
  const [error, setError] = useState(false);
  const [passed, setPassed] = useState(false);
  const [tmpBgColor, setTmpBgColor] = useState(bgColor);

  useEffect(() => {
    if ((innerWidth <= dashWidth) && pressed) {
      const interval = setInterval(() => {
        if (innerWidth >= dashWidth) {
          clearInterval(interval);
        }
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
    console.log(`Inner view width: ${innerWidth}, Dash view width: ${dashWidth}`);

    if (innerWidth <= dashWidth) {
      if (!pressed && (innerWidth !== 10 && innerWidth !== 0)) {
        startShake();
        setError(true);
        setBgColor(COLORS.red);
        setTimeout(() => {
          setError(false);
          setBgColor(tmpBgColor);
        }, 300);
      }
    } else {
      setCodeSequenceIndex(prevCodeSequenceIndex => prevCodeSequenceIndex+1);
    }

  }, [pressed, innerWidth, dashWidth]);

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
      2,
      true
    );
  };

  return (
    <Animated.View
      ref={dashViewRef}
      style={[
        styles.dashView,
        shakeStyle,
        { borderColor: error ? '#ff3700' : passed ? '#49eb34' : 'transparent' }
      ]}
      onLayout={onDashLayout}
      onTouchStart={() => startShake()}
    >
      <View style={{ paddingVertical: 15, backgroundColor: COLORS.green }}>
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
    paddingVertical: 0,
    width: 75,
    backgroundColor: COLORS.grey,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    borderColor: 'transparent',
    // borderWidth: 4
  },
});

