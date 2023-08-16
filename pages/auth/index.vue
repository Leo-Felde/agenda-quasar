<template>
  <q-card id="login-card">
    <q-card-section>
      <div class="text-h6 row flex-center text-primary">
        AgendaApp
      </div>
    </q-card-section>
    <q-separator />

    <q-card-section class="q-px-md">
      <q-card
        v-if="invalidCredentials"
        class="invalid-credentials"
        flat
        outline
      >
        <span class="text-red q-my-auto">Nome ou senha incorreto</span>
      </q-card>

      <q-form
        ref="formulario"
        class="q-gutter-md q-mt-md"
        @submit="onSubmit"
      >
        <q-input
          v-model="name"
          filled
          type="name"
          label="Nome *"
          :rules="[rules.obrigatorio]"
        />
      
        <q-input
          v-model="password"
          filled
          label="Senha *"
          :type="showPassword ? 'text' : 'password'"
          :rules="[rules.obrigatorio]"
        >
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>
        
        <div class="row flex-center">
          <q-btn
            label="Entrar"
            type="submit"
            color="primary"
            :loading="loading"
            style="width: 200px"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

import { rules } from '~/utils/validationRules'

import AuthAPI from '~/api/auth'
export default {
  setup () {
    definePageMeta({
      layout: 'auth'
    })

    const formulario = ref(null)
    const name = ref(null)
    const password = ref(null)
    const showPassword = ref(false)
    const invalidCredentials = ref(false)

    const loading = ref(false)

    const user = useCurrentUser()
    const $q = useQuasar()

    const onSubmit = async () => {
      if (loading.value) return


      if (!formulario.value.validate()) {
        return
      }

      await authenticate()
    }

    const authenticate = async () => {
      console.log('autenticar')
      const params = {
        username: name.value,
        password: password.value
      }
      loading.value = true

      try {
        const resp = await AuthAPI.login(params)
        invalidCredentials.value = false

        user.value = resp.data
        localStorage.setItem('userData',  JSON.stringify(user.value))
        return navigateTo('/')
      } catch (error) {
        if (error.response.status === 401) {
          invalidCredentials.value = true
        } else {
          console.error(error)
          $q.notify({
            message: 'Erro ao realizar login',
            position: 'top-right',
            color: 'red'
          })
        }
      } finally {
        loading.value = false
      }
    }
  
    return {
      formulario,
      invalidCredentials,
      name,
      password,
      showPassword,
      rules,
      loading,
      onSubmit
    }
  }
}
</script>

<style lang="sass" scoped>
#login-card
  width: 100%
  max-width: 400px

.invalid-credentials
  border: 1px solid red !important
  background: #fe000009
  height: 50px
  display: flex
  justify-content: center

</style>