import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MonitoringDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Monitoramento</Text>
      <Text style={styles.subtitle}>Aqui você verá os dados em tempo real!</Text>
      {/* Futuramente, aqui exibiremos gráficos, níveis de água, etc. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9', // Um verde claro para a tela de monitoramento
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32', // Um verde mais escuro
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50', // Um verde médio
    textAlign: 'center',
  },
});

export default MonitoringDetailsScreen;
