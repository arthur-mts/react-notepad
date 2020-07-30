import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  FontAwesome5,
} from '@expo/vector-icons';
import Home from '../screens/Home';

import Notes from '../screens/Notes';

const Tab = createBottomTabNavigator();

const Routers = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      creenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <FontAwesome5 name="home" size={size} color={color} />;
          }
          if (route.name === 'Notes') {
            return <FontAwesome5 name="note" size={size} color={color} />;
          }
          return null;
        },
      })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Notes" component={Notes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routers;