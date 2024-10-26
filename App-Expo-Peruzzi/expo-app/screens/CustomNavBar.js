import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CustomNavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
        <Ionicons name="log-in-outline" size={24} color="black" />
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Productos')} style={styles.button}>
        <Ionicons name="list-outline" size={24} color="black" />
        <Text style={styles.buttonText}>Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Usuarios')} style={styles.button}> 
        <Ionicons name="people-outline" size={24} color="black" />
        <Text style={styles.buttonText}>Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Proveedores')} style={styles.button}> 
        <Ionicons name="people-outline" size={24} color="black" />
        <Text style={styles.buttonText}>Proveedores</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
  },
});

export default CustomNavBar;
