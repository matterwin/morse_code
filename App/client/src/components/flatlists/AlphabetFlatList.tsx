import React from "react";
import { TouchableOpacity, SafeAreaView, Button, Text, View, StyleSheet, Image, Pressable, FlatList, TextInput } from "react-native";
import { COLORS } from '../../constants';
import { letterMorse } from '../../components/dots/MorseCodeMap.tsx';

const numColumns = 2;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?:!.,:;:+-/=".split('');

const ItemComponent = ({ item, handlePress, isFirst, isSecond, isSecondLast, isLast, isLastAgain, isActuallyLast}) => {
  return (
    <Pressable 
      onPress={() => handlePress(item)} 
      style={[
        styles.item, 
        isFirst && styles.firstItem, 
        isSecond && styles.firstItem, 
        isSecondLast && styles.lastItem, 
        isLast && styles.lastItem,
        isLastAgain && styles.lastItem,
        isActuallyLast && styles.lastItem && { marginBottom: 400 }
      ]}
    >
      <Text style={styles.morseCodeText}>{letterMorse(item)}</Text>
      <Text style={styles.text}>{item}</Text>
    </Pressable>
  );
};

const AlphabetFlatList = ({ handlePress }) => {
    const renderItem = ({ item, index }) => (
      <ItemComponent 
        item={item} 
        isFirst={index === 0}
        isSecond={index === 1}
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
   marginBottom: 120,
  },
  item: {
    backgroundColor: '#8a8a8a',
    // backgroundColor: COLORS.grey,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: '40%',
    padding: 10,
    borderWidth: 0.2,
    marginBottom: 0.2,
    // borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff"
  },
  listTextHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
  },
  morseCodeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.neonGreen, 
  },
});
