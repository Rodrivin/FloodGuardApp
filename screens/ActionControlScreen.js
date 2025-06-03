import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActionControlScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Ação e Controle</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ActionControlScreen;