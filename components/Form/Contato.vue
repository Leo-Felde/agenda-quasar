<template>
  <div>
    <!-- <div class="row">
      <div class="col-4">
        autocomplete pessoa
      </div>
      <div class="col-4">
        autocomplete usuario
      </div>
    </div> -->

    <div class="row">
      <div class="col-4">
        <q-select
          v-model="form.tipoContato"
          class="q-mx-sm"
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
      <div class="col-4">
        <q-input
          v-model="form.email"
          class="q-mx-sm"
          filled
          label="E-mail"
          :rules="[rules.email]"
          :readonly="readonly"
        />
      </div>
      <div class="col-4">
        <q-input
          v-model="form.telefone"
          class="q-mx-sm"
          filled
          label="Telefone"
          mask="(##) ####-#####"
          :readonly="readonly"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <q-input
          v-model="form.tag"
          class="q-mx-sm"
          filled
          label="Tag"
          :readonly="readonly"
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