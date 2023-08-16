<template>
  <div>
    <div class="row">
      <div class="col-4">
        <q-input
          v-model="form.nome"
          class="q-mx-sm"
          filled
          label="Nome *"
          :rules="rulesRequired"
          :readonly="readonly"
        />
      </div>
      <div class="col-4">
        <q-input
          v-model="form.username"
          class="q-mx-sm"
          filled
          label="Nome de usuário *"
          :rules="rulesRequired"
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
          :rules="rulesRequired"
          :readonly="readonly"
        />
        <!-- POR MÁSCARA AQUI DEPOIS :D -->
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <q-input
          v-model="form.dataNascimento"
          class="q-mx-sm"
          filled
          label="Data de nascimento"
          mask="##/##/####"
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
      <div class="col-4">
        <q-input
          v-model="form.email"
          class="q-mx-sm"
          filled
          label="E-mail"
          :rules="['email']"
          :readonly="readonly"
        />
      </div>
      <!-- POR REGRA DE E-MAIL E MÁSCARA DE TELEFONE -->
      <div class="col-4">
        <q-input
          v-model="form.telefone"
          class="q-mx-sm"
          filled
          label="Telefone"
          mask="(##)#########"
          :readonly="readonly"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <q-select
          v-model="form.tipo"
          class="q-mx-sm"
          filled
          label="Tipo de Usuário *"
          option-label="text"
          option-value="value"
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
      class="row"
    >
      <div class="col-4">
        <q-input
          v-model="form.password"
          class="q-mx-sm"
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
      <div class="col-4">
        <q-input
          v-model="form.password"
          class="q-mx-sm"
          filled
          label="Confirmar Senha *"
          :type="showPassword ? 'text' : 'password'"
          :readonly="readonly"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
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
    const tiposUsuario = ref([
      { text: 'Usuário', value: 'ROLE_USER' },
      { text: 'Admin', value: 'ROLE_ADMIN' },
    ])
    const showPassword = ref(false)

    const rulesRequired = ref([
      value => (value !== null && value !== '') || 'Campo obrigatório',
    ])

    watch(() => props.usuario, () => {
      form.value = props.usuario
    })

    onMounted(() => {
      form.value = props.usuario
    })

    return {
      form,
      tiposUsuario,
      rulesRequired,
      showPassword
    }
  }
}
</script>

<style>

</style>