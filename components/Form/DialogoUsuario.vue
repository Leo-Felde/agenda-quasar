<template>
  <DialogoCrud
    v-model="showDialog"
    :title="titulo"
    @salvar="salvar"
    @cancelar="cancelar"
  >
    <q-form ref="formulario">
      <FormUsuario
        class="ma-3"
        :usuario="usuarioSelecionado"
        :show-password-field="!usuarioSelecionado.id"
      />
    </q-form>
  </DialogoCrud>
</template>

<script>
import { ref, computed } from 'vue'

import { isEqual, cloneDeep } from 'lodash-es'
import { formatDate } from '~/utils/formatacao'
import { showSuccess,showError } from '../../plugins/notify'
import { showDiscardChanges } from '../../plugins/promptDialog'

import UsuariosAPI from '~/api/usuarios'
export default {
  props: {
    usuario: {
      type: Object, default: () => ({})
    },

    modelValue: Boolean
  },

  emits: ['update:modelValue', 'atualizar'],
  setup (props, { emit }) {
    const loading = ref(false)
    const formulario = ref(null)
    const showDialog = ref(false)
    const usuarioSelecionado = ref({tipos: ['ROLE_USER']})
    const usuarioOriginal = ref({tipos: ['ROLE_USER']})

    const alteracoesPendentes = computed(() => {
      return !isEqual(usuarioSelecionado.value, usuarioOriginal.value)
    })

    const titulo = computed(() => {
      return props.usuario.id ? 'Alterar usuário' : 'Novo usuário'
    })

    watch(() => props.usuario, () => {
      if (props.usuario.id) {
        carregar()
      }
    })

    watch(() => props.modelValue, (newValue) => {
      showDialog.value = newValue
      if (newValue && props.usuario.id) carregar()
    })
    
    const cancelar = async () => {
      if (alteracoesPendentes.value) {
        const confirm = await showDiscardChanges()
        if (confirm) conclude()
      } else {
        conclude()
      }
    }

    const salvar = async () => {
      if (!formulario.value.validate()) return
      if (!alteracoesPendentes.value) {
        conclude()
        return
      }

      try {
        const params = {
          usuario: cloneDeep(usuarioSelecionado.value),
          tipos: usuarioSelecionado.value.tipos
        }
        params.usuario.dataNascimento = formatDate(params.usuario.dataNascimento, false)
        delete params.usuario.tipos
        await UsuariosAPI.salvar(params)
        showSuccess(props.usuario.id ? 'Usuario atualizado' : 'Usuario cadastrado')
        emit('atualizar')
        conclude()
      } catch (error) {
        console.error(error)
        showError('Não foi possível salvar as alterações')
      } finally {
        loading.value = false
      }
    }

    const carregar = async () => {
      try {
        const resp = await UsuariosAPI.buscar(props.usuario.id)
        usuarioOriginal.value = resp.data.object.usuario

        usuarioOriginal.value.dataNascimento = formatDate(usuarioOriginal.value.dataNascimento)
        usuarioOriginal.value.tipos = resp.data.object.tipos
        usuarioSelecionado.value = cloneDeep(usuarioOriginal.value)
      } catch (error) {
        console.error(error)
        showError('Não foi possível carregar o usuario')
      } finally {
        loading.value = false
      }
    }

    const conclude = () => {
      usuarioOriginal.value = { tipos: ['ROLE_USER'] }
      usuarioSelecionado.value = cloneDeep(usuarioOriginal.value)
      formulario.value.resetValidation()
      emit('update:modelValue', false)
    }

    return {
      formulario,
      showDialog,
      titulo,
      usuarioSelecionado,
      usuarioOriginal,
      cancelar,
      salvar
    }
  }
}
</script>