<template>
  <div class="q-px-md">
    <div class="row q-col-gutter-md">
      <div class="responsive-col-4">
        <AutocompletePessoas
          v-model="form.pessoa"
        />
      </div>
      <div class="responsive-col-4">
        <AutocompleteUsuarios
          v-model="form.usuario"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="responsive-col-4">
        <q-select
          v-model="form.tipoContato"
          filled
          label="Forma de contato *"
          option-label="text"
          option-value="value"
          map-options
          emit-value
          :options="tiposContato"
          :readonly="readonly"
          :rules="[rules.obrigatorio]"
        />
      </div>
      <div class="responsive-col-4">
        <q-input
          v-model="form.email"
          filled
          label="E-mail"
          :rules="[rules.email]"
          :readonly="readonly"
        />
      </div>
      <div class="responsive-col-4">
        <q-input
          v-model="form.telefone"
          filled
          label="Telefone"
          :readonly="readonly"
          :error="false"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="responsive-col-4">
        <q-input
          v-model="form.tag"
          filled
          label="Tag"
          :readonly="readonly"
        />
      </div>
      <div class="responsive-col-4">
        <q-checkbox
          v-model="form.privado"
          label="Contato privado"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { rules } from '~/utils/validationRules'
export default {

  props: {
    contato: {
      type: Object,
      default: () => ({})
    },
    readonly: Boolean
  },

  setup (props) {
    const form = ref({})
    const tiposContato = ref([
      { text: 'E-mail', value: 'EMAIL' },
      { text: 'Celular', value: 'CELULAR' },
      { text: 'Telefone', value: 'TELEFONE' }
    ])

    watch(() => props.contato, () => {
      form.value = props.contato
    })

    onMounted(() => {
      form.value = props.contato
    })

    return {
      form,
      rules,
      tiposContato
    }
  }
}
</script>

<style>

</style>