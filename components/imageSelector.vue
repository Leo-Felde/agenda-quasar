<template>
  <div>
    <q-card
      class="result-image"
      flat
      bordered
    >
      <q-img
        :src="resultImage"
      >
        <div class="image-selector">
          <q-btn
            icon="image"
            round
            flat
            class="q-my-auto"
            style="height: 48px; width: 48px;"
            @click="showDialog = true"
          />
        </div>
      </q-img>
    </q-card>

    <DialogoCrud
      v-model="showDialog"
      title="Selecionar Imagem"
      content-class="imagem-selector-dialog"
      @cancelar="showDialog = false"
      @salvar="salvarImagem"
    >
      <cropper
        ref="cropper"
        class="q-mx-auto"
        :src="selectedFile"
        :stencil-props="{
          aspectRatio: 1,
          class: 'cropper-stencil'
        }"
      />
      <div class="d-flex q-pa-sm">
        <q-btn
          flat
          round
          icon="photo_camera"
          @click="showCameraDialog = true"
        />
        <input
          class="q-mt-sm"
          type="file"
          @input="onFileSelect"
        >
      </div>
    </DialogoCrud>
    
    <CameraView
      v-model="showCameraDialog"
      @novaFoto="usarFoto"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
  components: {
    Cropper,
  },


  setup () {
    const selectedFile = ref('https://images.unsplash.com/photo-1619737307100-55b82496fcda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')
    const resultImage = ref('https://images.unsplash.com/photo-1619737307100-55b82496fcda?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')
    const cropper = ref(null)
    const showDialog = ref(false)
    const showCameraDialog = ref(false)

    const onFileSelect = (event) => {
      if (!event.target.files.length) {
        return
      }

      const file = event.target.files[0]
      if (typeof FileReader === 'function') {
        const res = readAsDataURL(file)
        res.then((res) => {
          selectedFile.value = res
        })
      } else {
        console.error('Sorry, FileReader API not supported')
      }
    }

    const readAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onerror = reject
        fr.onload = function () {
          resolve(fr.result)
        }
        fr.readAsDataURL(file)
      })
    }

    const salvarImagem = () => {
      const { canvas } = cropper.value.getResult()
      resultImage.value = canvas.toDataURL()
    }

    const usarFoto = (fotoStream) => {
      selectedFile.value = fotoStream
    }

    return {
      selectedFile,
      resultImage,
      cropper,
      showDialog,
      showCameraDialog,
      onFileSelect,
      salvarImagem,
      usarFoto
    }
  },
}

</script>

<style lang="sass" scoped>
.vue-advanced-cropper, .result-image .q-img
  $size: 150px
  height: $size
  width: $size

.result-image
  width: fit-content
.image-selector
  height: 100%
  width: 100%
  display: flex
  justify-content: center
  flex: 0 0 auto
  opacity: 0%
  transition: 600ms
  &:hover
    opacity: 100%
</style>

<style lang="sass">
.imagem-selector-dialog
  max-width: 300px !important
  display: flex
  flex-direction: column

</style>