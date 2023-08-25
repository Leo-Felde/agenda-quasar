<template>
  <div>
    <lAutocomplete
      v-model="pessoaSelecionada"
      show-add-btn
      label="pessoa"
      :items="pessoas"
      @search="buscarPessoas"
      @click:append-inner="showDialogCrud = true"
      @update:modelValue="selecionarPessoa"
    />

    <FormDialogoPessoa
      v-model="showDialogCrud"
      @atualizar="adicionarNovaPessoa"
    />
  </div>
</template>

<script>
import { ref } from 'vue'

import { showError } from '~/utils/notify'
import { lAutocomplete } from 'biblioteca-quasar'

import PessoasAPI from '~/api/pessoas'
export default {
  components: { lAutocomplete },
  props: {
    modelValue: { type: Object, default: () => {}},
    showAddBtn: Boolean
  },

  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const showDialogCrud = ref(false)
    const pessoas = ref([])
    const pessoaSelecionada = ref(null)
    
    watch(() => props.modelValue, () => {
      pessoaSelecionada.value = props.modelValue
    })

    onMounted(() => {
      if (props.modelValue) {
        pessoas.value.push(props.modelValue)
      }
    })

    const buscarPessoas = async (event) => {
      try {
        const params = { nome: event }
        const resp = await PessoasAPI.pesquisar(params)
        pessoas.value = resp.data
      } catch (error) {
        console.error(error)
        showError('Não foi possivel pesquisar pessoas')
      }
    }

    const selecionarPessoa = () => {
      emit('update:modelValue', pessoaSelecionada.value)
    }

    const adicionarNovaPessoa = (novaPessoa) => {
      pessoas.value.push(novaPessoa.object)

      setTimeout(() => { // garante que o array já foi preenchido
        pessoaSelecionada.value = novaPessoa.object
      }, 100) 

      setTimeout(() => { // garante que o valor já existe
        selecionarPessoa()
      }, 200)
    }

    return {
      showDialogCrud,
      pessoas,
      buscarPessoas,
      selecionarPessoa,
      pessoaSelecionada,
      adicionarNovaPessoa
    }
  }
}
</script>
