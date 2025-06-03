import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa os componentes das telas que criamos
import LoginScreen from './screens/LoginScreen.js'; 
import DashboardScreen from './screens/DashboardScreen.js'; // Importa o DashboardScreen
import MonitoringDetailsScreen from './screens/MonitoringDetailsScreen.js'; // Importa a nova tela de detalhes
import AlertsScreen from './screens/AlertsScreen.js';
import ActionControlScreen from './screens/ActionControlScreen.js';
import HistoryScreen from './screens/HistoryScreen.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Bem-vindo ao FloodGuard', headerShown: false }} 
        />
        {/* A rota 'Monitoring' agora aponta para o DashboardScreen */}
        <Stack.Screen 
          name="Monitoring" // Mantemos o nome da rota 'Monitoring' para o Dashboard
          component={DashboardScreen} 
          options={{ title: 'Painel', headerShown: false }} // Oculta o cabeçalho para o painel
        />
        {/* Nova rota para os detalhes do monitoramento */}
        <Stack.Screen 
          name="MonitoringDetails" // Nova rota para a tela de detalhes
          component={MonitoringDetailsScreen} 
          options={{ title: 'Detalhes do Monitoramento' }} 
        />
        <Stack.Screen 
          name="Alerts" 
          component={AlertsScreen} 
          options={{ title: 'Alertas' }} 
        />
        <Stack.Screen 
          name="ActionControl" 
          component={ActionControlScreen} 
          options={{ title: 'Ação e Controle' }} 
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: 'Histórico' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;