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
import { useQuasar } from 'quasar'


import { isEqual, cloneDeep } from 'lodash-es'

import ContatosAPI from '~/api/contatos'
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

    const $q = useQuasar()

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
    
    const cancelar = () => {
      if (alteracoesPendentes.value) {
        console.log(contatoOriginal.value)
        console.log(contatoSelecionado.value)
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
        await ContatosAPI.salvar(contatoSelecionado.value)
        $q.notify({
          message: props.contato.id ? 'Contato atualizada' : 'Contato cadastrada',
          position: 'top-right',
          color: 'green'
        })
        emit('atualizar')
        conclude()
      } catch (error) {
        console.error(error)
        $q.notify({
          message: 'Ocorreu um erro ao salvar o contato',
          position: 'top-right',
          color: 'red'
        })
      } finally {
        loading.value = false
      }
    }

    const excluir = async () => {
      $q.dialog({
        title: 'Excluir contato',
        message: 'Deseja excluir esse contato? Isso não pode ser revertido',
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
          // await ContatosAPI.excluir(contatoSelecionado.value.id)
          $q.notify({
            message: 'Contato excluído com sucesso',
            position: 'top-right',
            color: 'green'
          })
          emit('atualizar')
          conclude()
        } catch (error) {
          $q.notify({
            message: 'Ocorreu um erro ao excluir o contato',
            position: 'top-right',
            color: 'red'
          })
        } finally {
          loading.value = false
        }
      })
    }

    const carregar =  () => {
      try {
        contatoOriginal.value = props.contato
        contatoSelecionado.value = cloneDeep(contatoOriginal.value)
      } catch (error) {
        console.error(error)
        $q.notify({
          message: 'Ocorreu um erro ao carregar o contato',
          position: 'top-right',
          color: 'red'
        })
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