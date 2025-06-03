import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Obtém a largura da tela para um layout responsivo
const { width } = Dimensions.get('window');
const itemWidth = (width - 20 * 2 - 20) / 2; // 20 de padding em cada lado + 20 de gap entre itens

const DashboardScreen = () => { // Nome do componente atualizado
  const navigation = useNavigation();

  // Dados para os itens do dashboard
  const dashboardItems = [
    // Agora, 'Monitoramento Atual' aponta para a nova tela 'MonitoringDetails'
    { name: 'Monitoramento Atual', icon: '📊', route: 'MonitoringDetails' }, 
    { name: 'Alertas', icon: '🔔', route: 'Alerts' },
    { name: 'Ação e Controle', icon: '⚙️', route: 'ActionControl' },
    { name: 'Histórico', icon: '📚', route: 'History' },
  ];

  // Função para navegar para a tela correspondente
  const navigateToScreen = (route) => {
    // Verifica se a rota é diferente da tela atual para evitar navegação redundante
    if (navigation.getState().routes[navigation.getState().index].name !== route) {
      navigation.navigate(route);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Painel FloodGuard</Text>
      <Text style={styles.headerSubtitle}>Navegue pelas funcionalidades</Text>

      <View style={styles.gridContainer}>
        {dashboardItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.gridItem, { width: itemWidth, height: itemWidth }]}
            onPress={() => navigateToScreen(item.route)}
          >
            <Text style={styles.itemIcon}>{item.icon}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495E',
    marginTop: 20,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 30,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  gridItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
    textAlign: 'center',
  },
});

export default DashboardScreen; // Exporta o componente com o novo nome
