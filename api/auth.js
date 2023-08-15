import createAPI from './index'

const route = '/auth'
const api = createAPI(route)

const methods = {
  login (params) {
    return api.post('/login', params)
  }
}

export default methods
