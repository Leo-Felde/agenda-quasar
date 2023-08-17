<template>
  <DialogoCrud
    v-model="showDialog"
    :title="titulo"
    :show-delete-btn="!!contatoSelecionado.id"
    @salvar="salvar"
    @cancelar="cancelar"
    @excluir="excluir"
  >
    <q-form ref="formulario">
      <FormContato
        class="ma-3"
        :contato="contatoSelecionado"
      />
    </q-form>
  </DialogoCrud>
</template>

<script>
import { ref, computed } from 'vue'

import { isEqual, cloneDeep } from 'lodash-es'
import { showSuccess, showError } from '~/plugins/notify'

import ContatosAPI from '~/api/contatos'
import { showDiscardChanges, showConfirmDelete } from '../../plugins/promptDialog'
export default {
  props: {
    contato: {
      type: Object, default: () => ({})
    },

    modelValue: Boolean
  },

  emits: ['update:modelValue', 'atualizar'],
  setup (props, { emit }) {
    const loading = ref(false)
    const formulario = ref(null)
    const showDialog = ref(false)
    const contatoSelecionado = ref({})
    const contatoOriginal = ref({})

    const alteracoesPendentes = computed(() => {
      return !isEqual(contatoSelecionado.value, contatoOriginal.value)
    })

    const titulo = computed(() => {
      return props.contato.id ? 'Alterar contato' : 'Novo contato'
    })

    watch(() => props.contato, () => {
      if (props.contato.id) {
        carregar()
      }
    })

    watch(() => props.modelValue, (newValue) => {
      showDialog.value = newValue
      if (newValue && props.contato.id) carregar()
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
        await ContatosAPI.salvar(contatoSelecionado.value)

        showSuccess(props.contato.id ? 'Contato atualizada' : 'Contato cadastrada')
        emit('atualizar')
        conclude()
      } catch (error) {
        console.error(error)
        showError('Ocorreu um erro ao salvar o contato')
      } finally {
        loading.value = false
      }
    }

    const excluir = async () => {
      const confirm = await showConfirmDelete('Excluir contato','Deseja excluir esse contato? Isso não pode ser revertido')
      if (confirm) {
        try {
          // await ContatosAPI.excluir(contatoSelecionado.value.id)
          showSuccess('Contato excluído com sucesso')
          emit('atualizar')
          conclude()
        } catch (error) {
          showError('Ocorreu um erro ao excluir o contato')
        } finally {
          loading.value = false
        }
      }
    }

    const carregar =  () => {
      try {
        contatoOriginal.value = props.contato
        contatoSelecionado.value = cloneDeep(contatoOriginal.value)
      } catch (error) {
        console.error(error)
        showError('Ocorreu um erro ao carregar o contato')
      } finally {
        loading.value = false
      }
    }

    const conclude = () => {
      contatoOriginal.value = {}
      contatoSelecionado.value = cloneDeep(contatoOriginal.value)
      formulario.value.resetValidation()
      emit('update:modelValue', false)
    }

    return {
      formulario,
      showDialog,
      titulo,
      contatoSelecionado,
      contatoOriginal,
      cancelar,
      salvar,
      excluir
    }
  }
}
</script>