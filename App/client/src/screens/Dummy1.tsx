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
import ImageSlider from '../components/extra/ImageSlider.tsx';

const Dummy1 = () => {
  const [userInput, setUserInput] = useState('');
  const navigation = useNavigation();

  const handlePress = (item) => {
    if (checkCharacters(userInput)) {
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
      <BlurView intensity={0} style={styles.overlay}>
        <LinearGradient 
          colors={['rgba(0,0,0,0.75)', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.15)', 'transparent']}
          style={{ flex: 1, width: '100%' }}
        />
        <BlurView intensity={20} style={styles.blurContainer}>
          <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.textInputContainerOuter}>
                <View style={styles.textInputContainerInner}>
                  <Pressable onPress={handleSearch}>
                    <Icon 
                      name={'search'} 
                      size={25} 
                      color={'#ccc'} 
                      style={styles.searchIcon} 
                    />
                  </Pressable>
                  <TextInput
                    placeholder='Enter a phrase'
                    placeholderTextColor={'#ccc'}
                    autoCapitalize='none'
                    autoCorrect={false}
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
    backgroundColor: COLORS.grey
  },
  overlay: {
    position: "absolute",
    top: 0,
    width: "100%",
    flex: 1,
    height: 120,
    paddingBottom: 10,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputContainerOuter: {
    alignItems: 'center',
    borderRadius: 15,
    width: "100%",
  },
  blurContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  textInputContainerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    color: '#fff',
    flex: 1,
    fontSize: 20,
    padding: 17,
    width: '100%'
  },
  searchIcon: {
    marginLeft: 15,
  },
  closeIcon: {
    paddingRight: 15,
  },
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 20,
    backgroundColor: 'rgba(43, 43, 43, 0.8)',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 20,
  },
});

