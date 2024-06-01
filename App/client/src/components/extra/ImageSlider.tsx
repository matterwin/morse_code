import React, { useState } from 'react';
import {
  View, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  Text,
  Pressable
} from 'react-native';
import Dummy2 from '../../screens/Dummy2.tsx';
import HelloWorld from '../../screens/TopViewSecond.tsx';
import TopView from '../../screens/TopView.tsx';
import { COLORS } from '../../constants';

const { height, width } = Dimensions.get('window');

const ImageSlider = ({
  bgColor,
  letterPhrase,
  letterPhraseIndex,
  visible,
  pauseTimer,
  codeSequence,
  codeSequenceIndex,
  setCodeSequence,
  setCodeSequenceIndex,
  setLetterPhraseIndex,
  word,
  wordIndex,
  pressed,
  padding,
  setPadding,
  pressInWhileNextSymbol,
  setPressInWhileNextSymbol,
  timer,
  setTimer,
  setBgColor,
  pressTimer,
  setPressTimer,
  indexChangeTimer,
  soundRef,
  volume,
  setWordIndex,
  modalVisible,
  setModalVisible,
  timeunit
}) => {
  const [active, setActive] = useState(0);

  const views = [
    { key: '1', selectedItem: 'SingleCode' },
    { key: '2', selectedItem: 'HelloWorld' }, 
  ];

  const onScrollChange = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <View>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={onScrollChange}
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}
      >
      {views.map((view) => (
        <View
          key={view.key}
          style={[{ width }]}
        >
          {view.selectedItem === 'HelloWorld' ? 
            <HelloWorld codeSequence={codeSequence} letterPhrase={letterPhrase} bgColor={bgColor} /> 
              :       
            <TopView
              bgColor={bgColor}
              letterPhrase={letterPhrase}
              letterPhraseIndex={letterPhraseIndex}
              visible={visible}
              pauseTimer={pauseTimer}
              codeSequence={codeSequence}
              codeSequenceIndex={codeSequenceIndex}
              setCodeSequence={setCodeSequence}
              setCodeSequenceIndex={setCodeSequenceIndex}
              setLetterPhraseIndex={setLetterPhraseIndex}
              word={word}
              wordIndex={wordIndex}
              pressed={pressed}
              padding={padding}
              setPadding={setPadding}
              pressInWhileNextSymbol={pressInWhileNextSymbol}
              setPressInWhileNextSymbol={setPressInWhileNextSymbol}
              timer={timer}
              setTimer={setTimer}
              setBgColor={setBgColor}
              pressTimer={pressTimer}
              setPressTimer={setPressTimer}
              indexChangeTimer={indexChangeTimer}
              soundRef={soundRef}
              volume={volume}
              setWordIndex={setWordIndex}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              timeunit={timeunit}
            />
          }
        </View>
      ))}
      </ScrollView>
      <View style={styles.pagination}>
        {views.map((_, index) => (
          <Text key={index} style={index === active ? styles.activeDot : styles.dot}>•</Text>
        ))}
      </View>
    </View>
  );
}

export default ImageSlider;

const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    fontSize: 20,
    color: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  dot: {
    color: '#888',
    fontSize: 30,
  },
  activeDot: {
    color: '#FFF',
    fontSize: 30,
  },
  topView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 5,
  },
  phraseText: {
    fontSize: '120%',
    fontWeight: '600',
    color: COLORS.grey,
  },
  codeText: {
    fontSize: 45,
    color: COLORS.grey,
  },
  toppy: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
    flex: 1,
  },
  topLeftView: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  topRightText: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    padding: 5,
    borderRadius: 3,
  },
  timerText: {
    fontSize: 17,
  },
  vieww: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    width: ''
  }
});


