<template>
  <div>
    <div class="row">
      <div class="col-4">
        <q-input
          v-model="form.nome"
          class="q-mx-sm"
          filled
          label="Nome *"
          :rules="[rules.obrigatorio]"
          :readonly="readonly"
        />
      </div>
      <div class="col-4">
        <q-input
          v-model="form.cpf"
          class="q-mx-sm"
          filled
          label="Cpf *"
          mask="###.###.###-##"
          :rules="[rules.obrigatorio, rules.cpf]"
          :readonly="readonly"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <q-input
          v-model="form.endereco.cidade"
          class="q-mx-sm"
          filled
          label="Cidade"
          :readonly="readonly"
        />
      </div>
      <div class="col-4">
        <!-- Aqui poderia ser um select -->
        <q-input
          v-model="form.endereco.estado"
          class="q-mx-sm"
          filled
          label="Estado"
          :error="false"
          :readonly="readonly"
        />
      </div>
      <div class="col-4">
        <q-input
          v-model="form.endereco.cep"
          class="q-mx-sm"
          filled
          label="CEP"
          mask="#####-###"
          :readonly="readonly"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <q-input
          v-model="form.endereco.logradouro"
          class="q-mx-sm"
          filled
          label="Logradouro"
          :readonly="readonly"
        />
      </div>
      <div class="col-4">
        <q-input
          v-model="form.endereco.bairro"
          class="q-mx-sm"
          filled
          label="Bairro"
          :readonly="readonly"
        />
      </div>
      <div class="col-4">
        <q-input
          v-model="form.endereco.numero"
          class="q-mx-sm"
          filled
          label="Numero"
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
    pessoa: {
      type: Object,
      default: () => ({endereco: {}})
    },
    readonly: Boolean
  },

  setup (props) {
    const form = ref({endereco: {}})

    watch(() => props.pessoa, () => {
      form.value = props.pessoa
    })

    onMounted(() => {
      form.value = props.pessoa
    })

    return {
      form,
      rules,
    }
  }
}
</script>

<style>

</style>