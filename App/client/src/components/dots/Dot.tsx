import React, { useState, useEffect, useRef } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native";
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

const Dot = ({ 
  pressed, 
  padding, 
  setPadding,
  setCodeSequenceIndex,
  pressInWhileNextSymbol,
  bgColor, 
  setBgColor,
  pressTimer, 
  setPressTimer 
}) => {
  const shake = useSharedValue(0);
  const innerViewRef = useRef(null);
  const dashViewRef = useRef(null);
  const [innerWidth, setInnerWidth] = useState(0);
  const [dashWidth, setDashWidth] = useState(0);
  const [error, setError] = useState(false);
  const [passed, setPassed] = useState(false);
  const [tmpBgColor, setTmpBgColor] = useState(bgColor);

  const [next, setNext] = useState(true);

  useEffect(() => {
    let pressTimerInterval;
    let timer;

    if (pressed && pressTimer <= 0 && !next) {
      const startTime = Date.now();

      const updateElapsedTime = () => { 
        const elapsedTime = Date.now() - startTime;
        setPressTimer(elapsedTime);
        setPadding((elapsedTime / 100) * 102);
      }; 

      pressTimerInterval = setInterval(updateElapsedTime, 1);

      timer = setTimeout(() => {
        clearInterval(pressTimerInterval);
        setNext(true);
        setPadding(10);
        setPressTimer(0);
        setCodeSequenceIndex(prevCodeSequenceIndex => prevCodeSequenceIndex + 1);
      }, 100);
    } else {
      setNext(false);
      if (!pressed && pressTimer <= 300 && pressTimer !== 0) {
        startShake();
        setPressTimer(0);
        setError(true);
        setBgColor(COLORS.red);
        setTimeout(() => {
          setError(false);
          setBgColor(tmpBgColor);
        }, 300);
      }
      setPadding(10);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(pressTimerInterval);
    };
  }, [pressed]);

  const onInnerLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setInnerWidth(width);
  };

  const onDashLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setDashWidth(width);
  };

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
        { borderColor: error ? '#ff3700' : passed ? COLORS.neonGreen : 'transparent' }
      ]}
      onLayout={onDashLayout}
      onTouchStart={() => startShake()}
    >
      <View style={{ paddingVertical: 15, backgroundColor: COLORS.green }}>
        <View
          ref={innerViewRef}
          style={{ paddingRight: `${padding}%` }}
          onLayout={onInnerLayout}
        />
      </View>
    </Animated.View>
  );
};

export default Dot;

const styles = StyleSheet.create({
  dashView: {
    paddingVertical: 0,
    width: 30,
    borderRadius: '100%',
    backgroundColor: COLORS.grey,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    borderColor: 'transparent',
  },
});


