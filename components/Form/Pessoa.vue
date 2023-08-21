<template>
  <div
    class="q-px-md d-flex"
    :class="$q.screen.lt.md ? 'flex-column' : ''"
  >
    <div :class="form.id ? '' : 'full-width'">
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
            v-model="form.endereco.cep"
            filled
            label="CEP"
            mask="#####-###"
            :loading="loadingCep"
            :readonly="readonly || loadingCep"
            @update:model-value="buscarCep"
          />
        </div>
        <div class="responsive-col-4">
          <q-input
            v-model="form.endereco.cidade"
            filled
            label="Cidade"
            :readonly="readonly || loadingCep"
          />
        </div>
        <div class="responsive-col-4">
          <!-- Aqui poderia ser um select -->
          <q-input
            v-model="form.endereco.estado"
            filled
            label="Estado"
            :error="false"
            :readonly="readonly || loadingCep"
          />
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="responsive-col-4">
          <q-input
            v-model="form.endereco.logradouro"
            filled
            label="Logradouro"
            :readonly="readonly || loadingCep"
          />
        </div>
        <div class="responsive-col-4">
          <q-input
            v-model="form.endereco.bairro"
            filled
            label="Bairro"
            :readonly="readonly || loadingCep"
          />
        </div>
        <div class="responsive-col-4">
          <q-input
            v-model="form.endereco.numero"
            filled
            label="Numero"
            :readonly="readonly || loadingCep"
            :error="false"
          />
        </div>
      </div>
    </div>
    <div
      v-if="form.id"
      :class="$q.screen.lt.md ? 'q-my-auto q-py-sm' : 'q-pl-md q-mt-auto q-pb-sm'"
    >
      <PessoaImagemSelector
        :id="form.id"
        v-model="form.foto"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

import { rules } from '~/utils/validationRules'

import ViaCep from '~/api/viaCep'
export default {
  props: {
    pessoa: {
      type: Object,
      default: () => ({ endereco: {} })
    },
    readonly: Boolean
  },
  
  setup(props) {
    const form = ref({ endereco: {} })
    const loadingCep = ref(false)

    watch(() => props.pessoa, () => {
      form.value = props.pessoa
    })

    onMounted(() => {
      form.value = props.pessoa
    })

    const buscarCep = async (cep) => {
      const campos = ['localidade', 'uf', 'logradouro', 'bairro']
      if (cep.length < 9) return

      try {
        loadingCep.value = true
        const resp = await ViaCep.buscarCEP(cep)

        campos.forEach((campo) => {
          if (resp.data[campo]) {
            if (campo === 'localidade') {
              form.value.endereco.cidade = resp.data[campo]
            } else if (campo === 'uf') {
              form.value.endereco.estado = resp.data[campo]
            } else {
              form.value.endereco[campo] = resp.data[campo]
            }
          }
        })
      } catch (error) {
        console.error(error)
      } finally {
        loadingCep.value = false
      }
      
    }

    return {
      form,
      loadingCep,
      rules,
      buscarCep
    }
  }
}
</script>

<style lang="sass" scoped>
</style>