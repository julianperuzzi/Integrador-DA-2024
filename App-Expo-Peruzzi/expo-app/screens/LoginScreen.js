import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CurrentRenderContext } from '@react-navigation/native';

const backgroundImage = { uri: 'https://images.pexels.com/photos/1083807/pexels-photo-1083807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' };

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: '', email: '', url_photo: '' });

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        // Recupera los datos del usuario
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
          setUserData(JSON.parse(userInfo)); // Establece los datos del usuario
        }
        setIsLoggedIn(true);
        navigation.navigate('Productos');
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      console.log('Enviando datos:', { email, password });

      const response = await axios.post('http://192.168.18.71:3000/api/login', {
        email,
        password,
      });

      console.log('Respuesta del servidor:', response.data);

      if (response.data.user) {
        // Guarda el userId y otros datos relevantes
        await AsyncStorage.setItem('userId', response.data.user.id.toString());
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.user)); // Guarda la información completa del usuario
        setUserData(response.data.user);
        setIsLoggedIn(true);
        navigation.navigate('Productos');
      } else {
        setErrorMessage('Login failed: No se recibió la información del usuario.');
      }
    } catch (error) {
      console.error('Error en la solicitud de login:', error);
      setErrorMessage('Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userInfo'); // Borra los datos del usuario
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setUserData({ username: '', email: '', url_photo: '' });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.overlay}>
        {isLoggedIn ? (
          <>
            <Text style={styles.welcomeText}>Bienvenido, {userData.username}</Text>
            <Image source={{ uri: userData.url_photo }} style={styles.profileImage} />
            <Text style={styles.userInfo}>Correo: {userData.email}</Text>
            <Button title="Logout" onPress={handleLogout} />
          </>
        ) : (
          <>
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
          </>
        )}
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
  welcomeText: {
    fontSize: 24,
    marginBottom: 15,
    textAlign:"center",
  },
  userInfo: {
    fontSize: 16,
    marginVertical: 5,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center', 
  },
});

export default LoginScreen;
