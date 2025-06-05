import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { apiService } from '../services/api';

const MonitoringDetailsScreen = () => {
  const [dadosSensores, setDadosSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarDados();
    // Atualiza os dados a cada 30 segundos
    const interval = setInterval(carregarDados, 30000);
    return () => clearInterval(interval);
  }, []);

  const carregarDados = async () => {
    try {
      const dados = await apiService.obterDadosSensores();
      setDadosSensores(dados);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados dos sensores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes do Monitoramento</Text>
      <Text style={styles.subtitle}>Dados em tempo real dos sensores</Text>

      {dadosSensores.map((sensor, index) => (
        <View key={index} style={styles.sensorCard}>
          <Text style={styles.sensorTitle}>Sensor {index + 1}</Text>
          <View style={styles.sensorData}>
            <Text style={styles.sensorLabel}>Nível da Água:</Text>
            <Text style={styles.sensorValue}>{sensor.nivelAgua} m</Text>
          </View>
          <View style={styles.sensorData}>
            <Text style={styles.sensorLabel}>Temperatura:</Text>
            <Text style={styles.sensorValue}>{sensor.temperatura}°C</Text>
          </View>
          <View style={styles.sensorData}>
            <Text style={styles.sensorLabel}>Umidade:</Text>
            <Text style={styles.sensorValue}>{sensor.umidade}%</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  sensorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sensorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  sensorData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  sensorLabel: {
    fontSize: 16,
    color: '#666',
  },
  sensorValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MonitoringDetailsScreen;
