<template>
  <div>
    <q-avatar
      size="48px"
    >
      <img
        :id="`image-${id}`"
        class="user-image"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
      >
    </q-avatar>
  </div>
</template>

<script>
import { onMounted } from 'vue'

import ImagemAPI from '~/api/imagem'
export default {
  props: {
    id: { type: [String, Number], required: true }
  },

  setup (props) {
    const getImage = async () => {
      try {
        const resp = await ImagemAPI.carregar(props.id)
        const blob = new Blob([resp.data], { type: 'image/png' })
        const imageUrl = URL.createObjectURL(blob)
        
        const imageElement = document.getElementById(`image-${props.id}`)
        if (imageElement) imageElement.src = imageUrl
        return imageUrl
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      getImage()
    })
  }
}
</script>

<style lang="sass" scoped>
.user-image
  width: 70px

</style>