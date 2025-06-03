import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email.trim() === '' || name.trim() === '') {
      Alert.alert('Campos Vazios', 'Por favor, preencha seu e-mail e nome para continuar.');
      return;
    }
    // Simula um login bem-sucedido
    Alert.alert('Sucesso', `Bem-vindo(a), ${name}!`, [
      { text: 'OK', onPress: () => navigation.navigate('Monitoring') }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao FloodGuard!</Text>
      <Text style={styles.subtitle}>Faça login para monitorar enchentes</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu.email@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome completo"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF', // AliceBlue, um fundo suave
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#34495E', // Darker blue-gray
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D', // Grayish
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#34495E',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFFF', // White background for input
    borderRadius: 12, // Rounded corners for inputs
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#BDC3C7', // Light gray border
    shadowColor: '#000', // Subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    width: '100%',
    padding: 18,
    backgroundColor: '#6C5CE7', // A vibrant purple
    borderRadius: 12, // Rounded corners for button
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#6C5CE7', // Shadow matching button color
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 30,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default LoginScreen;
