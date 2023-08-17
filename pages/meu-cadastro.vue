<template>
  <q-card
    bordered
    flat
  >
    <q-card-section>
      <div class="row justify-between q-pb-md">
        <span class="text-h6 q-my-auto">Meu Cadastro</span>
        <q-btn
          color="primary"
          icon-right="edit"
          :disable="editando"
          @click="editando = true"
        >
          Alterar
        </q-btn>
      </div>
      <q-form
        ref="formulario"
        class="q-gutter-md"
        @submit="salvar"
        @reset="cancelar"
      >
        <FormUsuario
          :usuario="usuario"
          :readonly="!editando"
        />

        <q-separator class="q-my-md" />
        <div class="row">
          <q-space />
          <q-btn
            flat
            class="q-mr-sm"
            :disable="!editando"
            type="reset"
          >
            Cancelar
          </q-btn>
          <q-btn
            color="primary"
            icon-right="save"
            :disable="!editando"
            type="submit"
          >
            Salvar
          </q-btn>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

import { isEqual, cloneDeep } from 'lodash-es'
import { formatDate } from '~/utils/formatacao'
import { showSuccess, showError } from '~/utils/notify'
import { showDiscardChanges } from '~/utils/promptDialog'

import UsuariosAPI from '~/api/usuarios'
export default {
  setup () {
    const editando = ref(false)
    const loading = ref(false)
    const formulario  = ref(null)
    const usuario = ref({})
    const usuarioOriginal = ref({})
    
    const user = useCurrentUser()

    const alteracoesPendentes = computed(() => {
      return editando.value ? !isEqual(usuarioOriginal.value, usuario.value) : false
    })

    const salvar = async () => {
      if (!formulario.value.validate()) return
      if (!alteracoesPendentes.value) {
        conclude()
        return
      }

      try {
        const param = {
          usuario: usuario.value
        }
        param.usuario.dataNascimento = formatDate(param.usuario.dataNascimento, false)

        await UsuariosAPI.atualizar(param.usuario)
        showSuccess('Usuario atualizado')
        editando.value = false
        setTimeout(() => {
          carregar()
        }, 200)
      } catch (error) {
        showError('Não foi possivel salvar as alterações')
      } finally {
        loading.value = false
      }
    }

    const cancelar = async () => {
      if (alteracoesPendentes.value) {
        const confirm = await showDiscardChanges()
        if (confirm) conclude()
      } else {
        conclude()
      }
    }

    const conclude = () => {
      usuario.value = cloneDeep(usuarioOriginal.value)
      editando.value = false
    }

    const carregar = async () => {
      const id = user.value.id 
      loading.value = true

      try {
        const resp = await UsuariosAPI.buscar(id)

        usuarioOriginal.value = resp.data.object.usuario
        usuarioOriginal.value.dataNascimento = formatDate(usuarioOriginal.value.dataNascimento)

        delete usuarioOriginal.value.password

        usuario.value = cloneDeep(usuarioOriginal.value)
      } catch (error) {
        showError('Não foi possivel carregar as informações')
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      carregar()
    })

    return {
      editando,
      loading,
      formulario ,
      usuario,
      salvar,
      cancelar
    }
  }
}
</script>