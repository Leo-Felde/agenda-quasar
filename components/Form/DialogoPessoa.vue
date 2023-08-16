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
import { useQuasar } from 'quasar'


import { isEqual, cloneDeep } from 'lodash-es'

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

    const $q = useQuasar()

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
        await PessoasAPI.salvar(pessoaSelecionada.value)
        $q.notify({
          message: props.pessoa.id ? 'Pessoa atualizada' : 'Pessoa cadastrada',
          position: 'top-right',
          color: 'green'
        })
        emit('atualizar')
        conclude()
      } catch (error) {
        console.error(error)
        $q.notify({
          message: 'Ocorreu um erro ao salvar a pessoa',
          position: 'top-right',
          color: 'red'
        })
      } finally {
        loading.value = false
      }
    }

    const excluir = async () => {
      $q.dialog({
        title: 'Excluir pessoa',
        message: 'Deseja excluir essa pessoa? Isso não pode ser revertido',
        persistent: true,
        cancel: {
          label: 'Cancelar',
          flat: true,
          color: 'black'
        },
        ok: {
          color: 'red',
          label: 'Excluir'
        },
      }).onOk(async () => {
        try {
          // await PessoasAPI.excluir(pessoaSelecionada.value.id)
          $q.notify({
            message: 'Pessoa excluída com sucesso',
            position: 'top-right',
            color: 'green'
          })
          emit('atualizar')
          conclude()
        } catch (error) {
          $q.notify({
            message: 'Ocorreu um erro ao excluir a pessoa',
            position: 'top-right',
            color: 'red'
          })
        } finally {
          loading.value = false
        }
      })
    }

    const carregar = async () => {
      try {
        const resp = await PessoasAPI.buscar(props.pessoa.id)

        pessoaOriginal.value = resp.data.object
        pessoaSelecionada.value = cloneDeep(pessoaOriginal.value)
      } catch (error) {
        console.error(error)
        $q.notify({
          message: 'Ocorreu um erro ao carregar a pessoa',
          position: 'top-right',
          color: 'red'
        })
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