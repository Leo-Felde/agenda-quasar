<template>
  <NuxtLayout>
    <VitePwaManifest />
    <NuxtPage />
  </NuxtLayout>
</template>h

<script>
import { onMounted } from 'vue'

import { showNotification } from '~/utils/notify'
export default {
  setup() {
    const { $pwa } = useNuxtApp()

    onMounted(() => {
      console.log($pwa)
      if ($pwa.offlineReady) {
        showNotification('Offline ready :D')
      }
    })
  },
}
</script>