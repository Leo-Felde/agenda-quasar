<template>
  <div class="d-flex autocomplete">
    <q-select
      v-model="pessoaSelecionada"
      label="pessoa"
      option-label="nome"
      use-input
      filled
      :options="pessoas"
      :error="false"
      @input-value="buscarPessoas"
      @update:modelValue="selecionarPessoa"
    >
      <template #no-option>
        <q-item>
          <q-item-section class="text-grey">
            Nenhuma pessoa encontrada
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <q-btn
      class="q-ml-sm add-btn"
      icon="add"
      color="primary"
      @click="showDialogCrud = true"
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

import PessoasAPI from '~/api/pessoas'
export default {
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
      if (props.modelValue?.id) {
        if (!pessoas.value.some(p => p.id === props.modelValue.id)) {
          pessoas.value.push(props.modelValue)
          setTimeout(() => {
            pessoaSelecionada.value = props.modelValue
          }, 100)
        }
      } else {
        buscarPessoas('')
      }
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
      console.log('pessoa selecionada')
      emit('update:modelValue', pessoaSelecionada.value)
    }

    const adicionarNovaPessoa = (novaPessoa) => {
      pessoas.value.push(novaPessoa.object)
      setTimeout(() => {
        pessoaSelecionada.value = novaPessoa.object
      }, 100)
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
