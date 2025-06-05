import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Ajuste para o IP do seu servidor

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Sensores
  async enviarDadosSensor(dadosSensor) {
    const response = await api.post('/sensores', dadosSensor);
    return response.data;
  },

  async obterDadosSensores() {
    const response = await api.get('/sensores');
    return response.data;
  },

  // Alertas
  async obterAlertas() {
    const response = await api.get('/alertas');
    return response.data;
  },

  // Controle
  async ativarBarreira(descricao) {
    const response = await api.post('/controle/barreira/ativar', { descricao });
    return response.data;
  },

  async registrarHistorico(evento) {
    const response = await api.post('/controle/historico', evento);
    return response.data;
  },

  async obterAcoesControle() {
    const response = await api.get('/controle/acoes');
    return response.data;
  }
}; 