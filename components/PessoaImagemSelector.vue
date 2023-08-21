<template>
  <ImageSelector
    v-model="image"
    @update:modelValue="uploadImage"
  />
</template>

<script>
import { ref, onMounted } from 'vue'

import ImagemAPI from '~/api/imagem'
export default {
  props: {
    id: {
      type: [String, Number],
      default: ''
    }
  },

  setup (props) {
    const image = ref('')
    
    onMounted(() => {
      getImage()
    })

    const getImage = async () => {
      try {
        const resp = await ImagemAPI.carregar(props.id)
        const blob = new Blob([resp.data], { type: 'image/png' })
        const imageUrl = URL.createObjectURL(blob)
        
        image.value = imageUrl
      } catch (error) {
        console.error(error)
      }
    }

    const uploadImage = async (url) => {
      try {
        const byteCharacters = atob(url.split(',')[1])
        const byteArrays = []

        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays.push(byteCharacters.charCodeAt(i))
        }
        const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' })

        const formData = new FormData()
        formData.append('foto', blob)

        await ImagemAPI.enviar(props.id, formData)
      } catch (error) {
        console.error(error)
      }
    }


    return {
      image,
      uploadImage
    }
  }
}
</script>

<style>

</style>