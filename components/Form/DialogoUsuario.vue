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
import { useQuasar } from 'quasar'


import { isEqual, cloneDeep } from 'lodash-es'
import { formatDate } from '~/utils/formatacao'

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

    const $q = useQuasar()

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
    
    const cancelar = () => {
      if (alteracoesPendentes.value) {
        $q.dialog({
          title: 'Alterações pendentes',
          message: 'Deseja cancelar e descartar todas as alterações?',
          persistent: true,
          cancel: {
            label: 'Cancelar',
            flat: true,
            color: 'black'
          },
          ok: {
            color: 'primary',
            label: 'Descartar'
          },
        }).onOk(() => {
          conclude()
        })
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
        $q.notify({
          message: props.usuario.id ? 'Usuario atualizado' : 'Usuario cadastrado',
          position: 'top-right',
          color: 'green'
        })
        emit('atualizar')
        conclude()
      } catch (error) {
        console.error(error)
        $q.notify({
          message: 'Ocorreu um erro ao salvar o usuario',
          position: 'top-right',
          color: 'red'
        })
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
        $q.notify({
          message: 'Ocorreu um erro ao carregar o usuario',
          position: 'top-right',
          color: 'red'
        })
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