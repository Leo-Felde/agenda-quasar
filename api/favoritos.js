import createAPI from './index'

const route = '/favorito'
const api = createAPI(route)

const methods = {
  pesquisar () {
    return api.get('/pesquisar')
  },

  excluir (id) {
    return api.delete(`/remover/${id}`)
  },

  salvar (params) {
    return api.post('/salvar', params)
  },
}

export default methods
