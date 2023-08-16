import { ref } from 'vue'

export const rules = ref({
  obrigatorio: value => !!value || 'Campo obrigatório.',
  counter: value => value.length <= 20 || 'Max 20 characters',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return value ? pattern.test(value) || 'E-mail inválido.': true
  },

  cpf: value => {
    const pattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    return value ? pattern.test(value) || 'Cpf inválido': true
  },

  senha: value => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_=+[\]{}|;:'",.<>/?\\]+$/
    return value ? value.length >= 8 ? pattern.test(value) || 'Deve conter letras e numeros' : 'Deve ter no minimo 8 characteres' : true
  },

  data: value => {
    const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    return value ? pattern.test(value) || 'Data inválida' : true
  }
})
