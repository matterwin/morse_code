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
import SearchModal from '../components/modals/SearchModal.tsx';

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
          style={{ flex:1, width: '100%' }}
        />
        <BlurView intensity={30} style={styles.blurContainer}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '90%', borderRadius: 20, backgroundColor: 'rgba(43, 43, 43, 0.7)' }} >
        <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderRadius: 20, }}>
        <View style={styles.textInputContainer}>
          <View style={styles.textInputContainerOld}>
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
              placeholderTextColor={'#fff'}
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
    backgroundColor: COLORS.greyLighter
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
  textInputContainer: {
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
  textInputContainerOld: {
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
    marginRight: 15,
  },
  searchIconOld: {
    paddingLeft: 15
  },
  closeIcon: {
    paddingRight: 15,
  },
});

