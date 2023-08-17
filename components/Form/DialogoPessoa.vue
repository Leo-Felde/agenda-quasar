<template>
  <DialogoCrud
    v-model="showDialog"
    :title="titulo"
    :show-delete-btn="!!pessoaSelecionada.id"
    @salvar="salvar"
    @cancelar="cancelar"
    @excluir="excluir"
  >
    <q-form ref="formulario">
      <FormPessoa
        class="ma-3"
        :pessoa="pessoaSelecionada"
      />
    </q-form>
  </DialogoCrud>
</template>

<script>
import { ref, computed } from 'vue'

import { isEqual, cloneDeep } from 'lodash-es'
import { showSuccess, showError } from '~/plugins/notify'
import { showDiscardChanges, showConfirmDelete } from '../../plugins/promptDialog'

import PessoasAPI from '~/api/pessoas'
export default {
  props: {
    pessoa: {
      type: Object, default: () => ({endereco: {}})
    },

    modelValue: Boolean
  },

  emits: ['update:modelValue', 'atualizar'],
  setup (props, { emit }) {
    const loading = ref(false)
    const formulario = ref(null)
    const showDialog = ref(false)
    const pessoaSelecionada = ref({endereco: {}})
    const pessoaOriginal = ref({endereco: {}})

    const alteracoesPendentes = computed(() => {
      return !isEqual(pessoaSelecionada.value, pessoaOriginal.value)
    })

    const titulo = computed(() => {
      return props.pessoa.id ? 'Alterar pessoa' : 'Nova pessoa'
    })

    watch(() => props.pessoa, () => {
      if (props.pessoa.id) {
        carregar()
      }
    })

    watch(() => props.modelValue, (newValue) => {
      showDialog.value = newValue
      if (newValue && props.pessoa.id) carregar()
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
        await PessoasAPI.salvar(pessoaSelecionada.value)
        showSuccess(props.pessoa.id ? 'Pessoa atualizada' : 'Pessoa cadastrada')
        emit('atualizar')
        conclude()
      } catch (error) {
        console.error(error)
        showError('Não foi possível salvar as alterações')
      } finally {
        loading.value = false
      }
    }

    const excluir = async () => {
      const confirm = await showConfirmDelete('Excluir pessoa', 'Deseja excluir essa pessoa? Isso não pode ser revertido')
      if (confirm) {
        try {
          // await PessoasAPI.excluir(pessoaSelecionada.value.id)
          showSuccess('Pessoa excluída com sucesso')
          emit('atualizar')
          conclude()
        } catch (error) {
          showError('Não foi possível excluir a pessoa')
        } finally {
          loading.value = false
        }
      }
    }

    const carregar = async () => {
      try {
        const resp = await PessoasAPI.buscar(props.pessoa.id)

        pessoaOriginal.value = resp.data.object
        pessoaSelecionada.value = cloneDeep(pessoaOriginal.value)
      } catch (error) {
        console.error(error)
        showError('Não foi possível carregar a pessoa')
      } finally {
        loading.value = false
      }
    }

    const conclude = () => {
      pessoaOriginal.value = { endereco: {} }
      pessoaSelecionada.value = cloneDeep(pessoaOriginal.value)
      formulario.value.resetValidation()
      emit('update:modelValue', false)
    }

    return {
      formulario,
      showDialog,
      titulo,
      pessoaSelecionada,
      pessoaOriginal,
      cancelar,
      salvar,
      excluir
    }
  }
}
</script>