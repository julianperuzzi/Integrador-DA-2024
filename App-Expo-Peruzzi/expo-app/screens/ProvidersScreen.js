import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

const ProvidersScreen = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://192.168.18.248:3000/api/proveedores');
        setProviders(response.data); // Guarda los datos de proveedores
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.providerCard}>
      <Image source={{ uri: item.url_photo }} style={styles.photo} />
      <View style={styles.infoContainer}>
        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.name}>Nombre: {item.name}</Text>
        <Text style={styles.city}>Ciudad: {item.city}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={providers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  company: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
  },
  city: {
    fontSize: 14,
    color: '#555',
  },
});

export default ProvidersScreen;
