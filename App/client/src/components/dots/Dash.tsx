import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
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

const Dash = ({
  pressed, 
  padding, 
  setPadding,
  setCodeSequenceIndex,
  pressInWhileNextSymbol,
  bgColor, 
  setBgColor,
  pressTimer, 
  setPressTimer,
  timeunit,
  interCharPause
}) => {
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);  
  const [next, setNext] = useState(true);
  const shake = useSharedValue(0);

  let timer;
  let pressTimerInterval;
  useEffect(() => {
    if (!pressed && (pressTimer === interCharPause || pressTimer === timeunit)) {
      setPressTimer(0);
    }

    if (pressed && pressTimer <= 0 && !next) {
      const startTime = Date.now();

      const updateElapsedTime = () => { 
        const elapsedTime = Date.now() - startTime;
        setPressTimer(elapsedTime);
        setProgress((elapsedTime / interCharPause));  
      }; 

      pressTimerInterval = setInterval(updateElapsedTime, 1);

      timer = setTimeout(() => {
        clearInterval(pressTimerInterval)
        setProgress(0);
        setNext(true);
        setPressTimer(interCharPause);
        setCodeSequenceIndex(prevCodeSequenceIndex => prevCodeSequenceIndex + 1);
      }, interCharPause);
    } else {
      setNext(false);
      if (!pressed && pressTimer < interCharPause && pressTimer !== 0 && pressTimer !== timeunit && pressTimer !== interCharPause)  {
        startShake();
        setPressTimer(0);
        setError(true);
        setBgColor(COLORS.red);
        setTimeout(() => {
          setError(false);
          setBgColor(COLORS.blue);
        }, 300);
      }
      setProgress(0);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(pressTimerInterval);
    };
  }, [pressed]); 

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
        style={[
          styles.dashView,
          shakeStyle,
        ]}
      >
        <ProgressBar
          progress={progress} 
          width={100} 
          height={25} 
          unfilledColor={COLORS.grey} 
          color={COLORS.snow}
          borderWidth={3}
          borderColor={"#000"}
          animated={false}
        />
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  dashView: {
    paddingVertical: 0,
    width: 100,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    borderColor: 'transparent',
  },
});

export default Dash;


