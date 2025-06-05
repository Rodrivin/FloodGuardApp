import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { apiService } from '../services/api';

const AlertsScreen = () => {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarAlertas();
    // Atualiza os alertas a cada 30 segundos
    const interval = setInterval(carregarAlertas, 30000);
    return () => clearInterval(interval);
  }, []);

  const carregarAlertas = async () => {
    try {
      const dados = await apiService.obterAlertas();
      setAlertas(dados);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar alertas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getNivelRisco = (nivel) => {
    if (nivel > 5.0) return { texto: 'Alto', cor: '#D32F2F' };
    if (nivel > 3.0) return { texto: 'Médio', cor: '#FFA000' };
    return { texto: 'Baixo', cor: '#2E7D32' };
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
      <Text style={styles.title}>Alertas do Sistema</Text>
      <Text style={styles.subtitle}>Monitoramento de situações críticas</Text>

      {alertas.length === 0 ? (
        <Text style={styles.noAlerts}>Nenhum alerta ativo no momento</Text>
      ) : (
        alertas.map((alerta, index) => {
          const nivelRisco = getNivelRisco(alerta.nivelAgua);
          return (
            <View key={index} style={styles.alertCard}>
              <View style={[styles.riskIndicator, { backgroundColor: nivelRisco.cor }]} />
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Alerta de Enchente</Text>
                <Text style={styles.alertTime}>{new Date(alerta.timestamp).toLocaleString()}</Text>
                <View style={styles.alertDetails}>
                  <Text style={styles.alertLabel}>Nível de Risco:</Text>
                  <Text style={[styles.alertValue, { color: nivelRisco.cor }]}>
                    {nivelRisco.texto}
                  </Text>
                </View>
                <View style={styles.alertDetails}>
                  <Text style={styles.alertLabel}>Nível da Água:</Text>
                  <Text style={styles.alertValue}>{alerta.nivelAgua} m</Text>
                </View>
                <Text style={styles.alertDescription}>{alerta.descricao}</Text>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  riskIndicator: {
    width: 8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  alertContent: {
    flex: 1,
    padding: 15,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  alertTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  alertDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  alertLabel: {
    fontSize: 16,
    color: '#666',
  },
  alertValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  alertDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  noAlerts: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AlertsScreen;