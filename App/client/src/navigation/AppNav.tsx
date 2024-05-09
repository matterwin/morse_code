import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Dummy from '../screens/Dummy.tsx';
import Dummy2 from '../screens/Dummy2.tsx';

const Stack = createStackNavigator();

const AppNav = () => {

  return (
    <Stack.Navigator initialRouteName='GridOfAlphabet'>
      <Stack.Screen name={"GridOfAlphabet"} component={Dummy} options={{ headerShown: true }}/>
      <Stack.Screen name={"Dummy2"} component={Dummy2} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default AppNav;

const styles = StyleSheet.create({

});
