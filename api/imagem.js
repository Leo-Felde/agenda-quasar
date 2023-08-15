import createAPI from './index'

const route = '/foto'
const api = createAPI(route, 'arraybuffer')

const methods = {
  carregar (id) {
    return api.get(`/download/${id}`)
  },

  enviar (id, params) {
    return api.post(`/upload/${id}`, params)
  },
}

export default methods
