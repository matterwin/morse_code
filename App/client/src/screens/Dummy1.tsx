import React, { useState, useEffect } from "react";
import { 
  TouchableOpacity, 
  SafeAreaView, 
  Button, 
  Text, 
  View, 
  StyleSheet,
  Image,
  Pressable,
  FlatList, 
  TextInput,
  Alert,
  ScrollView
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import AlphabetFlatList from '../components/flatlists/AlphabetFlatList.tsx';
import NumbersFlatList from '../components/flatlists/NumbersFlatList.tsx';
import { checkCharacters } from '../components/dots/MorseCodeMap.tsx';

const Dummy1 = () => {
  const [userInput, setUserInput] = useState('');
  const navigation = useNavigation();

  const handlePress = (item) => {
    if (checkCharacters(item)) {
      navigation.navigate('Dummy2', { selectedItem: item });
    } else {
      Alert.alert("Illegal Character");
    }
  };

  const handleSearch = () => {
    handlePress(userInput);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true}/>
      <BlurView intensity={10} style={styles.overlay}>
        <LinearGradient 
          colors={['rgba(0,0,0,0.75)', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.15)', 'transparent']}
          style={{ flex:1, width: '100%' }}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '80%', backgroundColor: COLORS.grey, borderRadius: 20, }} >
        <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
        <View style={styles.textInputContainer}>
          <View style={styles.textInputContainerOld}>
          <BlurView intensity={90}/>
            <TouchableOpacity>
              <Icon 
                name={'search'} 
                size={25} 
                color={'#ccc'} 
                style={styles.searchIconOld} 
              />
            </TouchableOpacity>
            <TextInput
              placeholder='Enter phrase'
              placeholderTextColor={'#ccc'}
              autoCapitalize='none'
              onChangeText={(text) => setUserInput(text)}
              style={styles.textInput}
              keyboardAppearance='dark'
              value={userInput}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            {userInput !== '' &&
              <TouchableOpacity onPress={() => setUserInput('')}>
                <Icon name="close" size={25} color={'#ccc'} style={styles.closeIcon} />
              </TouchableOpacity>
            }
          </View>
        </View> 
        </View>
      </View>      
      </BlurView>
      <AlphabetFlatList handlePress={handlePress} />
    </View>
  );
};

export default Dummy1;

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    backgroundColor: COLORS.yellow
  },
  overlay: {
    position: "absolute",
    top: 0,
    width: "100%",
    flex: 1,
    height: 100,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputContainer: {
    alignItems: 'center',
    borderRadius: 15,
    width: "100%",
  },
  textInputContainerOld: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    color: '#ccc',
    flex: 1,
    fontSize: 17,
    padding: 15,
    width: '100%'
  },
  searchIcon: {
    marginLeft: 15,
    marginRight: 15,
  },
  searchIconOld: {
    paddingLeft: 15
  },
  closeIcon: {
    paddingRight: 15,
  },
});

