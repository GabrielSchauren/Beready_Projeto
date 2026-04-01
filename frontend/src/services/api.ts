import axios from 'axios'

const API_BASE_URL = 'http://localhost:8765'  // Sem o /api

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const auth = {
  register: (data: { nome: string; email: string; senha: string }) =>
    api.post('/auth/register', data),  // Sem /api

  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),  // Sem /api

  logout: () =>
    api.post('/auth/logout'),

  profile: () =>
    api.get('/users/profile')
}

export default api