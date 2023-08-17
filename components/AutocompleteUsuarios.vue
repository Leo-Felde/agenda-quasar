<template>
  <q-select
    v-model="usuarioSelecionado"
    label="usuario"
    option-label="nome"
    use-input
    filled
    :options="usuarios"
    :error="false"
    @input-value="buscarUsuarios"
    @update:modelValue="selecionarUsuario"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          Nenhum usuario encontrado
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { ref } from 'vue'

import { showError } from '~/utils/notify'

import UsuariosAPI from '~/api/usuarios'
export default {
  props: {
    modelValue: { type: Object, default: () => {}}
  },

  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const usuarios = ref([])
    const usuarioSelecionado = ref(null)

    const buscarUsuarios = async (event) => {
      try {
        const params = { termo: event }
        const resp = await UsuariosAPI.pesquisar(params)
        usuarios.value = resp.data
      } catch (error) {
        console.error(error)
        showError('Não foi possivel pesquisar usuários')
      }
    }
    const selecionarUsuario = () => {
      emit('update:modelValue', usuarioSelecionado.value)
    }

    watch(() => props.modelValue, () => {
      if (props.modelValue?.id) {
        if (!usuarios.value.some(u => u.id === props.modelValue.id)) {
          usuarios.value.push(props.modelValue)
          setTimeout(() => {
            usuarioSelecionado.value = props.modelValue
          }, 100)
        }
      } else {
        buscarUsuarios('')
      }
    })
    
    
    onMounted(() => {
      if (props.modelValue) {
        usuarios.value.push(props.modelValue)
      }
    })

    return {
      usuarios,
      buscarUsuarios,
      selecionarUsuario,
      usuarioSelecionado
    }
  }
}
</script>