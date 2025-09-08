import axios from 'axios'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const axiosClient = axios.create({
  baseURL: BACKEND,
  withCredentials: true,
  timeout: 20000
})

export default axiosClient
