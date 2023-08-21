<template>
  <div class="d-flex autocomplete">
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

    <q-btn
      v-if="userAdmin"
      class="q-ml-sm add-btn"
      icon="add"
      color="primary"
      @click="showDialogCrud = true"
    />

    <FormDialogoUsuario
      v-model="showDialogCrud"
      @atualizar="adicionarNovoUsuario"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'

import { showError } from '~/utils/notify'

import UsuariosAPI from '~/api/usuarios'
export default {
  props: {
    modelValue: { type: Object, default: () => {}}
  },

  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const showDialogCrud = ref(false)
    const usuarios = ref([])
    const usuarioSelecionado = ref(null)

    const user = useCurrentUser()
    const userAdmin = computed(() => {
      return user.value.tipos.includes('ROLE_ADMIN')
    })

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

    const adicionarNovoUsuario = (novoUsuario) => {
      console.log('novo usuario')
      console.log(novoUsuario)
      usuarios.value.push(novoUsuario.object)
      setTimeout(() => {
        usuarioSelecionada.value = novoUsuario.object
      }, 100)
    }

    return {
      showDialogCrud,
      usuarios,
      usuarioSelecionado,
      userAdmin,
      buscarUsuarios,
      selecionarUsuario,
      adicionarNovoUsuario
    }
  }
}
</script>
