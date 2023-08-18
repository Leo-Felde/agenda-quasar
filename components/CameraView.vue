<template>
  <q-dialog
    v-model="showDialog"
    persistent
  >
    <q-card>
      <div class="video-container">
        <video
          v-show="isCameraOpen && !isPhotoTaken"
          ref="camera"
          class="camera-video"
          :width="450"
          :height="337"
          autoplay
          playsinline
        />
        <canvas
          v-show="isPhotoTaken"
          id="photoTaken"
          ref="canvas"
          class="canvas-photo"
          :width="450"
          :height="337"
        />
      </div>
      <div class="d-flex justify-center q-py-sm">
        <q-btn
          v-if="!isPhotoTaken && isCameraOpen"
          color="primary"
          icon-right="add_a_photo"
          @click="takePhoto"
        >
          <span>Fotografar</span>
        </q-btn>
        <q-btn
          v-show="isPhotoTaken && isCameraOpen"
          class="camera-download q-pr-sm"
          icon-right="refresh"
          flat
          @click="isPhotoTaken = false"
        >
          Tentar novamente
        </q-btn>
        <q-btn
          v-show="isPhotoTaken && isCameraOpen"
          class="camera-download"
          icon-right="check"
          color="primary"
          @click="downloadImage"
        >
          Usar essa foto
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'

import { showError } from '~/utils/notify'
export default {
  name: 'Camera',

  props: {
    modelValue: Boolean,
  },

  emits: ['update:modelValue', 'novaFoto'],
  setup (props, { emit}) {
    const showDialog = ref(false)
    const camera = ref(null)
    const canvas = ref(null)
    const isCameraOpen = ref(false)
    const isPhotoTaken = ref(false)

    watch(() => props.modelValue, (newValue) => {
      showDialog.value = newValue

      toggleCamera()
    })

    const createCameraElement = () => {
      const constraints = (window.constraints = {
        audio: false,
        video: true
      })

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          camera.value.srcObject = stream
        })
        .catch(error => {
          showError(error)
        })
    }

    const stopCameraStream = () => {
      const tracks = camera.value.srcObject.getTracks()

      tracks.forEach(track => {
        track.stop()
      })
    }

    const toggleCamera = () => {
      if (isCameraOpen.value) {
        isCameraOpen.value = false
        isPhotoTaken.value = false
        stopCameraStream()
      } else {
        isCameraOpen.value = true
        createCameraElement()
      }
    }

    const takePhoto = () => {
      isPhotoTaken.value = !isPhotoTaken.value

      const context = canvas.value.getContext('2d')
      const photoFromVideo = camera.value

      context.drawImage(photoFromVideo, 0, 0, 450, 337)
    }
    
    const downloadImage = () => {
      const canvas = document.getElementById('photoTaken').toDataURL('image/png ')
      emit('novaFoto', canvas)
      stopCameraStream()
      emit('update:modelValue', false)
    }

    return {
      showDialog,
      camera,
      canvas,
      isCameraOpen,
      isPhotoTaken,
      createCameraElement,
      stopCameraStream,
      toggleCamera,
      takePhoto,
      downloadImage
    }
  }
}
</script>