import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { apiService } from '../services/api';

const ActionControlScreen = () => {
  const [acoes, setAcoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarAcoes();
    // Atualiza as ações a cada 30 segundos
    const interval = setInterval(carregarAcoes, 30000);
    return () => clearInterval(interval);
  }, []);

  const carregarAcoes = async () => {
    try {
      const dados = await apiService.obterAcoesControle();
      setAcoes(dados);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar ações de controle');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAtivarBarreira = async () => {
    try {
      await apiService.ativarBarreira('Ativação manual da barreira');
      Alert.alert('Sucesso', 'Barreira ativada com sucesso!');
      carregarAcoes(); // Recarrega as ações após ativar
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível ativar a barreira');
      console.error(err);
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
      <Text style={styles.title}>Ação e Controle</Text>
      <Text style={styles.subtitle}>Gerenciamento de barreiras e ações</Text>

      <TouchableOpacity style={styles.actionButton} onPress={handleAtivarBarreira}>
        <Text style={styles.actionButtonText}>Ativar Barreira</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Últimas Ações</Text>
      {acoes.length === 0 ? (
        <Text style={styles.noActions}>Nenhuma ação registrada</Text>
      ) : (
        acoes.map((acao, index) => (
          <View key={index} style={styles.actionCard}>
            <Text style={styles.actionType}>{acao.tipo}</Text>
            <Text style={styles.actionTime}>
              {new Date(acao.timestamp).toLocaleString()}
            </Text>
            <Text style={styles.actionDescription}>{acao.descricao}</Text>
          </View>
        ))
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
  actionButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionCard: {
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
  actionType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  actionTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  actionDescription: {
    fontSize: 16,
    color: '#333',
  },
  noActions: {
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

export default ActionControlScreen;