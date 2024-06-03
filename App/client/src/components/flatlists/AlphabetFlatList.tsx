import React from "react";
import { TouchableOpacity, SafeAreaView, Button, Text, View, StyleSheet, Image, Pressable, FlatList, TextInput } from "react-native";
import { COLORS } from '../../constants';
import { letterMorse } from '../../components/dots/MorseCodeMap.tsx';
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

const numColumns = 3;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?:!.,:;:+-/=".split('');

const ItemComponent = ({ item, handlePress, isFirst, isSecond, isThird, isSecondLast, isLast, isLastAgain, isActuallyLast}) => {
  const backgroundColor = useSharedValue(COLORS.yellow);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  const startFadeOut = () => {
    backgroundColor.value = withTiming('rgba(0, 0, 0, 0)', {
      duration: 200,
      easing: Easing.circle,
    });
  };

  const endFadeOut = () => {
    backgroundColor.value = withTiming(COLORS.yellow, {
      duration: 200,
      easing: Easing.linear,
    });
  };

  return (
    <Animated.View style={[styles.item, animatedStyle, isFirst && styles.firstItem, 
      isSecond && styles.firstItem, 
      isThird && styles.firstItem,
      isSecondLast && styles.lastItem, 
      isLast && styles.lastItem,
      isLastAgain && styles.lastItem,
      isActuallyLast && styles.lastItem && { marginBottom: 300 }]}
    >
      <Pressable 
        onPress={() => handlePress(item)}
        onPressIn={() => startFadeOut()}
        onPressOut={() => endFadeOut()}
        style={styles.itemPressable}
      >
        <Text style={styles.morseCodeText}>{letterMorse(item)}</Text>
        <Text style={styles.text}>{item}</Text>
      </Pressable>
    </Animated.View>
  );
};

const AlphabetFlatList = ({ handlePress }) => {
    const renderItem = ({ item, index }) => (
      <ItemComponent 
        item={item} 
        isFirst={index === 0}
        isSecond={index === 1}
        isThird={index === 2}
        isSecondLast={index === 24} 
        isLast={index === 25}
        isLastAgain={index === 35}
        isActuallyLast={index === 47}
        handlePress={handlePress} 
      />
    );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={alphabet}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={ ()=>
          <Text style={styles.listTextHeader}>Allowed Characters</Text>
        }
      />
    </View>
  );
};

export default AlphabetFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  flatList: {
    flex: 1,
    paddingTop: 120
  },
  row: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
  },
  firstItem: {
    marginTop: 30,
  },
  lastItem: {
   marginBottom: 80,
  },
  box: {
    width: '30%'
  },
  item: {
    backgroundColor: '#8a8a8a',
    // backgroundColor: COLORS.grey,
    backgroundColor: COLORS.yellow,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: '31%',
    padding: 10,
    borderWidth: 0.2,
    marginBottom: 10,
    borderRadius: 10,
    // borderRadius: 10,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.grey
  },
  listTextHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.yellow,
    marginLeft: 10,
  },
  morseCodeText: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.grey, 
  },
  itemPressable: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
