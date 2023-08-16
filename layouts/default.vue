<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      id="main-header"
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleDrawer"
        />

        <q-toolbar-title>
          AgendaApp
        </q-toolbar-title>

        <UserAvatar />
      </q-toolbar>
    </q-header>

    <NavigationDrawer
      v-model="showDrawer"
      @update:modelValue="showDrawer = $event"
    />

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const showDrawer = ref(false)

    return {
      showDrawer,
      toggleDrawer () {
        showDrawer.value = !showDrawer.value
      }
    }
  }
}
</script>

<style lang="sass" scoped>
$bodyMargin: 18px
$mainHeaderSize: 70px

#main-header
  display: flex
  height: $mainHeaderSize

.q-page-container
  height: 100%
  margin: $bodyMargin
  padding: 28px

.q-page-container
  height: calc(100vh - $mainHeaderSize - 34) // 34 = offset do posicionamento
</style>