import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Dummy1 from '../screens/Dummy1.tsx';
import Dummy2 from '../screens/Dummy2.tsx';

const Tab = createMaterialTopTabNavigator();

const MorseNav = () => {
  return (
    <Tab.Navigator initialRouteName='Dummy'
      screenOptions={() => ({
        tabBarStyle: {
          display: 'none'
        }
      })}
    >
      <Tab.Screen name="Dummy1" component={Dummy1} options={{ tabBarVisible: false, swipeEnabled: true }} />
      <Tab.Screen name="Dummy2" component={Dummy2} options={{ tabBarVisible: false }} />
    </Tab.Navigator>
  );
};

export default MorseNav;
