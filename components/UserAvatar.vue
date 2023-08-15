<template>
  <q-avatar
    size="48px"
    class="cursor-pointer"
  >
    <img src="https://d2ph5fj80uercy.cloudfront.net/04/cat887.jpg">
    <q-menu touch-position>
      <q-card>
        <q-btn
          icon="logout"
          style="width: 200px"
          @click="logout"
        >
          Sair
        </q-btn>
      </q-card>
    </q-menu>
  </q-avatar>
</template>

<script>
export default {
  setup () {
    const logout = () => {
      console.log('sair')
      return navigateTo('/auth')
    }

    return {
      logout
    }
  }
}
</script>

<style>

</style>