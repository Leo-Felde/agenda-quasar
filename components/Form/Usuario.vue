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
          v-model="form.username"
          filled
          label="Nome de usuário *"
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
          :rules="[rules.cpf]"
          :readonly="readonly"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="responsive-col-4">
        <q-input
          v-model="form.dataNascimento"
          filled
          label="Data de nascimento"
          mask="##/##/####"
          :rules="[rules.data]"
          :readonly="readonly"
        >
          <template #append>
            <q-icon
              name="event"
              class="cursor-pointer"
            >
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="form.dataNascimento"
                  mask="DD-MM-YYYY"
                  :disable="readonly"
                >
                  <div class="row items-center justify-end">
                    <q-btn
                      v-close-popup
                      label="Close"
                      color="primary"
                      flat
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
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
          :error="false"
          :readonly="readonly"
        />
      </div>
    </div>

    <div
      v-if="form.tipos"
      class="row q-col-gutter-md"
    >
      <div class="responsive-col-4">
        <q-select
          v-model="form.tipos"
          filled
          label="Tipo de Usuário *"
          option-label="text"
          option-value="value"
          map-options
          emit-value
          :options="tiposUsuario"
          :readonly="readonly"
        />
      </div>
    </div>
    <q-separator
      v-if="showPasswordField"
      class="q-my-md"
    />
    <div
      v-if="showPasswordField"
      class="row q-col-gutter-md"
    >
      <div class="responsive-col-4">
        <q-input
          v-model="form.password"
          filled
          label="Senha *"
          :type="showPassword ? 'text' : 'password'"
          :readonly="readonly"
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              :disable="readonly"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
      </div>
      <div class="responsive-col-4">
        <q-input
          v-model="confirmPassword"
          filled
          label="Confirmar Senha *"
          :type="showPassword ? 'text' : 'password'"
          :readonly="readonly"
          :rules="[confirmPasswordRule]"
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
    usuario: {
      type: Object,
      default: () => ({})
    },
    readonly: Boolean,
    showPasswordField: Boolean
  },

  

  setup (props) {
    const form = ref({})
    const confirmPassword = ref(null)
    const showPassword = ref(false)
    
    const tiposUsuario = ref([
      { text: 'Usuário', value: 'ROLE_USER' },
      { text: 'Admin', value: 'ROLE_ADMIN' },
    ])

    const confirmPasswordRule = () => {
      return form.value.password ? confirmPassword.value === form.value.password || 'As senhas não são iguais' : true
    }

    watch(() => props.usuario, () => {
      form.value = props.usuario
    })

    onMounted(() => {
      form.value = props.usuario
    })

    return {
      form,
      confirmPassword,
      tiposUsuario,
      confirmPasswordRule,
      rules,
      showPassword
    }
  }
}
</script>

<style>

</style>