import createAPI from './index'

const route = '/contato'
const api = createAPI(route)

const methods = {
  listar (id) {
    return api.get(`/listar/${id}`)
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
