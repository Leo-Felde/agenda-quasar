<template>
  <div class="q-px-md">
    <div class="row q-col-gutter-md">
      <div class="responsive-col-4">
        <q-input
          v-model="form.nome"
          filled
          label="Nome *"
          :rules="[rules.obrigatorio]"
          :readonly="readonly"
        />
      </div>
      <div class="responsive-col-4">
        <q-input
          v-model="form.cpf"
          filled
          label="Cpf *"
          mask="###.###.###-##"
          :rules="[rules.obrigatorio, rules.cpf]"
          :readonly="readonly"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="responsive-col-4">
        <q-input
          v-model="form.endereco.cidade"
          filled
          label="Cidade"
          :readonly="readonly"
        />
      </div>
      <div class="responsive-col-4">
        <!-- Aqui poderia ser um select -->
        <q-input
          v-model="form.endereco.estado"
          filled
          label="Estado"
          :error="false"
          :readonly="readonly"
        />
      </div>
      <div class="responsive-col-4">
        <q-input
          v-model="form.endereco.cep"
          filled
          label="CEP"
          mask="#####-###"
          :readonly="readonly"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="responsive-col-4">
        <q-input
          v-model="form.endereco.logradouro"
          filled
          label="Logradouro"
          :readonly="readonly"
        />
      </div>
      <div class="responsive-col-4">
        <q-input
          v-model="form.endereco.bairro"
          filled
          label="Bairro"
          :readonly="readonly"
        />
      </div>
      <div class="responsive-col-4">
        <q-input
          v-model="form.endereco.numero"
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