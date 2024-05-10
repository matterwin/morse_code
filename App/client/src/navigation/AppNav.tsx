import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Dummy from '../screens/Dummy.tsx';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <Stack.Navigator initialRouteName='Dummy'>
      <Stack.Screen name={"Dummy"} component={Dummy} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10
  },
});

export default AppNav;

