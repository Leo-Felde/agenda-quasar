<template>
  <q-card
    class="my-card"
  >
    <q-card-section>
      <div class="text-h6 row flex-center text-primary">
        AgendaApp
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <form
        class="q-gutter-md"
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
      >
        <q-input
          ref="emailRef"
          v-model="email"
          filled
          type="email"
          label="E-mail *"
          :rules="rulesEmail"
        />
      
        <q-input
          ref="passwordRef"
          v-model="password"
          filled
          label="Senha *"
          :type="showPassword ? 'text' : 'password'"
          :rules="rulesRequired"
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
            style="width: 200px"
          />
        </div>
      </form>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup () {
    definePageMeta({
      layout: 'auth'
    })
    const $q = useQuasar()
    
    const email = ref(null)
    const emailRef = ref(null)
    const emailRegex = ref(/^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/)

    const password = ref(null)
    const passwordRef = ref(null)
    const showPassword = ref(false)


    const rulesRequired = ref([
      value => (value !== null && value !== '') || 'Campo obrigatório',
    ])
    const rulesEmail = ref([
      value => emailRegex.value.test(value) || 'E-mail inválido',
      rulesRequired
    ])

    const onSubmit = () => {
      emailRef.value.validate()
      passwordRef.value.validate()

      if (emailRef.value.hasError || emailRef.value.hasError) {
        // form has error
      }
 
      $q.notify('Message')
      
    }

    const onReset = () => {
      email.value = null
      password.value = null

      emailRef.value.resetValidation()
      passwordRef.value.resetValidation()
    }
  
    return {
      email,
      emailRef,
      password,
      passwordRef,
      rulesRequired,
      rulesEmail,
      showPassword,
      onSubmit,
      onReset
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 500px
</style>