import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ProductsScreen from './screens/ProductsScreen';
import UsersScreen from './screens/UsersScreen'; 
import CustomNavBar from './screens/CustomNavBar'; 
import { View, StyleSheet } from 'react-native';
import ProvidersScreen from './screens/ProvidersScreen';

//user de prueba admin@gmail.com admin
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
          name="Productos" 
          component={ProductsScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Usuarios" 
          component={UsersScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen name="Proveedores"
         component={ProvidersScreen}
         options={{ headerShown: false }} 
          />

      </Stack.Navigator>
      <CustomNavBar /> 
    </NavigationContainer>
  );
}
