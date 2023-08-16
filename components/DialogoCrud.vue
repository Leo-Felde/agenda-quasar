<template>
  <q-dialog
    v-model="showDialog"
    persistent
  >
    <q-card style="max-width: 800px; width: 100%">
      <div class="row q-pa-sm justify-center">
        <span class="text-h6 q-my-auto"> {{ title }} </span> 
        <q-space />
        <q-btn
          icon="close"
          flat
          class="q-my-auto"
          @click="cancelar"
        />
      </div>
      <q-separator class="q-mb-sm" />

      <slot />

      <q-separator class="q-mt-sm" />
      <div class="row q-pa-sm">
        <q-btn
          v-if="showDeleteBtn"
          color="red"
          icon-right="delete"
          @click="excluir"
        >
          Excluir
        </q-btn>
        <q-space />
        <q-btn
          class="q-mr-sm"
          flat
          @click="cancelar"
        >
          Cancelar
        </q-btn>
        <q-btn
          color="primary"
          icon-right="save"
          @click="salvar"
        >
          Salvar
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    modelValue: Boolean,
    showDeleteBtn: Boolean,
    showSaveBtn: { type: Boolean, default: true},
    title: { type: String, default: 'Titulo' }
  },

  emits: ['update:modelValue', 'salvar', 'cancelar', 'excluir'],

  setup (props, { emit }) {
    const form = ref(null)
    const showDialog = ref(false)

    watch(() => props.modelValue, (newValue) => {
      showDialog.value = newValue
    })

    const excluir = () => {
      emit('excluir')
    }

    const cancelar = () => {
      emit('cancelar')
    }

    const salvar = async () => {
      emit('salvar')
    }

    // const conclude = () => {
    //   emit('update:modelValue', false)
    //   form.value.reset() 
    // }

    return {
      form,
      showDialog,
      excluir,
      cancelar,
      salvar
    }
  }
}
</script>