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
      id="navigation-drawer"
      v-model="showDrawer"
      @update:modelValue="showDrawer = $event"
    />

    <q-page-container :class="$q.screen.lt.md ? 'mobile' : ''">
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
.q-page-container.mobile
  padding-left: 0px !important
  padding-right: 0px !important
</style>