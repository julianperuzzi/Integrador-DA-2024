import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';


const backgroundImage = { uri: 'https://images.pexels.com/photos/12778855/pexels-photo-12778855.jpeg' };

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Enviando datos:', { email, password });

      const response = await axios.post('http://192.168.18.248:3000/api/login', {
        email,
        password,
      });

      console.log('Respuesta del servidor:', response.data);

      if (response.data.user) {
        navigation.navigate('Products');
      } else {
        setErrorMessage('Login failed');
      }
    } catch (error) {
      console.error('Error en la solicitud de login:', error);
      setErrorMessage('Login failed: ' + error.message);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.overlay}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <Button title="Login" onPress={handleLogin} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
