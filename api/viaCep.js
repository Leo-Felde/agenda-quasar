import axios from 'axios'

const methods = {
  buscarCEP (cep) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}

export default methods

