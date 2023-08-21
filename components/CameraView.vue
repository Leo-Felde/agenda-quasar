<template>
  <q-dialog v-model="showDialog">
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
      <div
        v-if="isCameraOpen"
        class="q-py-sm"
      >
        <div
          v-if="!isPhotoTaken"
          class="d-flex q-mx-md"
        >
          <q-btn
            icon="close"
            flat
            fab
            style="position: absolute"
            @click="$emit('update:modelValue', false)"
          />
          <q-btn
            class="q-mx-auto"
            icon="photo_camera"
            flat
            fab
            @click="takePhoto"
          />
        </div>
        <div
          v-else
          class="d-flex justify-between q-mx-md"
        >
          <q-btn
            icon="close"
            flat
            fab
            @click="isPhotoTaken = false"
          />
          <q-btn
            class="camera-download"
            icon="check"
            flat
            fab
            @click="downloadImage"
          />
        </div>
      </div>
      <div v-else>
        <q-btn
          round
          flat
          @click="$emit('update:modelValue', false)"
        >
          cancelar
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