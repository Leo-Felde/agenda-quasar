import axios from 'axios'

const AppURL = 'https://demometaway.vps-kinghost.net:8487/api'

const createAPI = (routeURL, responseType = 'json') => {
  const baseURL = AppURL + routeURL

  const api = axios.create({
    baseURL,
    responseType,
  })

  api.interceptors.request.use((config) => {
    const storedUser = JSON.parse(localStorage.getItem('userData'))
    if (storedUser) {
      config.headers['Authorization'] = `Bearer ${storedUser.accessToken}`
    }

    return config
  })

  return api
}

export default createAPI
