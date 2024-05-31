import React, { useState } from 'react';
import {
    View, StyleSheet, ScrollView, Dimensions, Text
} from 'react-native';
import Dummy2 from '../../screens/Dummy2.tsx';
import HelloWorld from '../../screens/TopViewSecond.tsx';
import TopView from '../../screens/TopView.tsx';

const ImageSlider = ({
  setWordSpace,
  setLetterSpace,
  bgColor,
  letterPhrase,
  letterPhraseIndex,
  wordSpace,
  letterSpace,
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
}) => {
    const { height, width } = Dimensions.get('window');

    const [active, setActive] = useState(0);

    const views = [
    { key: '1', backgroundColor: 'red', selectedItem: 'Item 1' },
    { key: '3', backgroundColor: 'green', selectedItem: 'HelloWorld' }, // Add HelloWorld slide
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
                style={{ width, height }}>
                {views.map((view) => (
          <View
            key={view.key}
            style={[{ width }]}>
            {view.selectedItem === 'HelloWorld' ? <HelloWorld codeSequence={codeSequence} letterPhrase={letterPhrase}/> :       
              <TopView
              setWordSpace={setWordSpace}
              setLetterSpace={setLetterSpace}
              bgColor={bgColor}
              letterPhrase={letterPhrase}
              letterPhraseIndex={letterPhraseIndex}
              wordSpace={wordSpace}
              letterSpace={letterSpace}
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
            />
 }
          </View>
        ))}
            </ScrollView>
            <View style={styles.pagination}>
                {views.map((_, index) => (
                    <Text key={index} style={index === active ? styles.activeDot : styles.dot}>
                        •
                    </Text>
                ))}
            </View>
        </View>
    );
}

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
        bottom: -15,
        alignSelf: 'center',
    },
    dot: {
        color: '#888',
        fontSize: 50,
    },
    activeDot: {
        color: '#FFF',
        fontSize: 50,
    },
});

export default ImageSlider;

