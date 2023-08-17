<template>
  <q-avatar
    size="48px"
    class="cursor-pointer"
  >
    <img src="https://d2ph5fj80uercy.cloudfront.net/04/cat887.jpg">
    <q-menu touch-position>
      <q-list
        dense
        style="min-width: 100px"
      >
        <q-item>
          <q-item-section>
            <q-btn-toggle
              v-model="tema"
              class="q-mx-auto"
              rounded
              toggle-color="primary"
              :options="[
                {label: 'Claro', value: 0},
                {label: 'Escuro', value: 1}
              ]"
            />
          </q-item-section>
        </q-item>
        <q-item v-close-popup>
          <q-item-section>
            <q-btn
              flat
              icon="logout"
              style="width: 200px"
              @click="logout"
            >
              Sair
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-avatar>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  setup () {
    const tema = ref(0)

    const user = useCurrentUser()
    const $q = useQuasar()

    watch(() => tema.value, () => {
      $q.dark.set(!!tema.value)
    })

    const logout = () => {
      localStorage.removeItem('userData')
      user.value = {}
      navigateTo('/auth')
    }

    return {
      tema,
      logout
    }
  }
}
</script>

<style lang="sass" scoped>
#user-options
  display: flex
  flex-direction: column

.q-btn-group
  width: fit-content
</style>