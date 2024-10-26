import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.18.248:3000/api/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar usuarios: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users} style={styles.cont}
      keyExtractor={(item) => item.id.toString()} 
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={{ uri: item.url_photo }} style={styles.photo} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.username}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
  cont: {
    marginTop: 32,
  },
  item: {
    flexDirection: 'row', 
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center', 
  },
  photo: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 10,
  },
  info: {
    flex: 1, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UsersScreen;
