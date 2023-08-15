import createAPI from './index'

const route = '/pessoa'
const api = createAPI(route)

const methods = {
  buscar (id) {
    return api.get(`/buscar/${id}`)
  },

  pesquisar (params) {
    return api.post('/pesquisar', params)
  },

  excluir (id) {
    return api.delete(`/remover/${id}`)
  },


  salvar (params) {
    return api.post('/salvar', params)
  },
}

export default methods
