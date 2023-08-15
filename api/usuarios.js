import createAPI from './index'

const route = '/usuario'
const api = createAPI(route)

const methods = {
  alterarSenha (params) {
    return api.post('/alterarSenha', params)
  },

  atualizar (params) {
    return api.put('/atualizar', params)
  },
  
  buscar (id) {
    return api.get(`/buscar/${id}`)
  },

  pesquisar (params) {
    return api.post('/pesquisar', params)
  },

  salvar (params) {
    return api.post('/salvar', params)
  },
}

export default methods
