import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ProductsScreen from './screens/ProductsScreen';
import CustomNavBar from './screens/CustomNavBar'; 
import { View, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Products" 
          component={ProductsScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
      <CustomNavBar /> 
    </NavigationContainer>
  );
}
