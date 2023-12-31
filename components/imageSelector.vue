<template>
  <div :class="`image-selector${$q.screen.lt.md ? '-mobile' : ''}`">
    <q-card
      class="result-image"
      flat
      bordered
    >
      <q-img
        :src="resultImage"
        placeholder-src="https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg"
        fit="fill"
      >
        <div class="change-image-overlay">
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
        :src="selectedImage || 'https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg'"
        :stencil-props="{
          aspectRatio: 1,
          class: 'cropper-stencil'
        }"
      />
      <div class="row q-pa-md">
        <div :class="$q.screen.lt.md ? 'responsive-col--6 q-mx-auto' : 'responsive-col-5 q-my-auto'">
          <q-btn
            flat
            :class="$q.screen.lt.md ? '' : 'd-flex q-ml-auto q-mr-sm'"
            icon-right="photo_camera"
            dense
            @click="showCameraDialog = true"
          >
            tirar uma foto
          </q-btn>
        </div>
        <span
          v-if="!$q.screen.lt.md"
          class="col-1 q-my-auto text-h6"
        >
          ou
        </span>

        <div :class="`responsive-col-${$q.screen.lt.md ? '6': '5'}`">
          <q-file
            v-model="selectedFile"
            :class="$q.screen.lt.md ? 'q-px-sm' : ''"
            filled
            label="Procurar imagem"
            clearable
            dense
            accept=".jpg, image/*"
            @update:modelValue="onFileSelect"
          >
            <template #prepend>
              <q-icon name="attach_file" />
            </template>
            <template #file>
              <span class="file-name"> {{ selectedFile.name }} </span>
            </template>
          </q-file>
        </div>
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

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const selectedFile = ref(null)
    const selectedImage = ref('')
    const resultImage = ref('')
    
    const cropper = ref(null)
    const showDialog = ref(false)
    const showCameraDialog = ref(false)

    watch(() => props.modelValue, (newValue) => {
      resultImage.value = newValue
    })

    const onFileSelect = () => {
      if (!selectedFile.value) {
        return
      }
      
      const file = selectedFile.value
      if (typeof FileReader === 'function') {
        const res = readAsDataURL(file)
        res.then((res) => {
          selectedImage.value = res
        })
      } else {
        console.error('FileReader API not supported')
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
      emit('update:modelValue', resultImage.value)
      showDialog.value = false
    }

    const usarFoto = (fotoStream) => {
      selectedImage.value = fotoStream
    }

    return {
      selectedFile,
      selectedImage,
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
.result-image .q-img
  $size: 150px
  height: $size
  width: $size

.vue-advanced-cropper
  height: 250px
  width: 250px

.result-image
  width: fit-content
.change-image-overlay
  height: 100%
  width: 100%
  display: flex
  justify-content: center
  flex: 0 0 auto
  opacity: 0%
  transition: 600ms
  &:hover
    opacity: 100%

.file-name
  max-width: 120px
  width: 100% !important
  display: ruby
  overflow: hidden
  text-overflow: ellipsis
</style>

<style lang="sass">
.imagem-selector-dialog
  max-width: 500px !important
  display: flex
  flex-direction: column

.q-field__native
  div
    max-width: 100px
    overflow: hidden
    text-overflow: ellipsis
</style>