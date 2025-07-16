import axios from 'axios'

const API_BASE_URL = 'http://localhost:3333'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)

export interface SignupRequest {
  username: string
  password: string
}

export interface SigninRequest {
  username: string
  password: string
}

export interface AuthResponse {
  user: {
    id: number
    username: string
  }
  token: string
  message: string
}

export interface GameAnswersResponse {
  numbers: number[]
  solutions: string[]
  cached: boolean
}

export const authAPI = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/signup', data)
    return response.data
  },
  
  signin: async (data: SigninRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/signin', data)
    return response.data
  },
  
  signout: async (): Promise<void> => {
    await api.post('/api/signout')
  },
  
  me: async () => {
    const response = await api.get('/api/me')
    return response.data
  }
}

export const gameAPI = {
  getAnswers: async (numbers: number[]): Promise<GameAnswersResponse> => {
    const response = await api.get(`/api/get-answers?numbers=${numbers.join(',')}`)
    return response.data
  }
}

export default api