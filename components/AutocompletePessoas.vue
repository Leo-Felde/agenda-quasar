<template>
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
</template>

<script>
import { ref } from 'vue'

import PessoasAPI from '~/api/pessoas'
export default {
  props: {
    modelValue: { type: Object, default: () => {}}
  },

  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const pessoas = ref([])
    const pessoaSelecionada = ref(null)

    const buscarPessoas = async (event) => {
      try {
        const params = { nome: event }
        const resp = await PessoasAPI.pesquisar(params)
        pessoas.value = resp.data
      } catch (error) {
        console.error(error)
        $q.notify({
          message: 'Não foi possivel pesquisar pessoas',
          position: 'top-right',
          color: 'red'
        })
      }
    }
    const selecionarPessoa = () => {
      emit('update:modelValue', pessoaSelecionada.value)
    }

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

    return {
      pessoas,
      buscarPessoas,
      selecionarPessoa,
      pessoaSelecionada
    }
  }
}
</script>