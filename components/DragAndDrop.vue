<script setup lang="ts">
import Cropper from 'cropperjs'

const props = defineProps({
  userId: {
    type: String,
  },
  onSuccess: { type: Function },
  imgPath: { type: String },
})

const dialog = ref(false)
const imageUrl = ref('')

let cropper = null

function initCropper() {
  async function createObjectURLFromFileAddress() {
    try {
      // Fetch the file from the address
      const response = await fetch(props.imgPath)
      if (!response.ok) {
        throw new Error('Failed to fetch the file')
      }

      // Convert the response into a Blob
      const blob = await response.blob()

      // Create an object URL from the Blob
      imageUrl.value = URL.createObjectURL(blob)
    } catch (error) {
      console.error('Error creating object URL:', error)
    }
  }
  if (!imageUrl && props.imgPath) {
    createObjectURLFromFileAddress()
  }

  const imageEl = document.getElementById('image')

  cropper = new Cropper(imageEl, {
    aspectRatio: 0,
    autoCrop: false,
    ready: (event) => {},
  })
}

const onDragOver = (event) => {
  event.dataTransfer.dropEffect = 'copy'
}

const onDrop = async (event) => {
  const files = event.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    if (file.type === 'application/pdf') {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('userId', props.userId)

        const response = await $fetch('http://localhost:3001/api/files', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        })

        props.onSuccess(response)

        dialog.value = true
      } catch (error) {
        console.error(error)
      }
    } else if (file.type.startsWith('image/')) {
      imageUrl.value = URL.createObjectURL(file)

      const formData = new FormData()
      formData.append('photo', file)

      try {
        const response = await fetch(
          `http://localhost:3001/users/${props.userId}/photo`,
          {
            method: 'PATCH',
            body: formData,
            credentials: 'include',
          }
        )
        if (response.photo) {
          props.onSuccess(response.photo)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}

function cropImage() {
  if (cropper) {
    cropper.crop()
  }
}

onMounted(() => {
  initCropper()
})

onBeforeUnmount(() => {
  if (cropper) {
    cropper.destroy()
  }
})
</script>

<template>
  <div
    class="d-flex w-50 ml-auto text-center position-relative rounded-xl overflow-hidden"
    :style="{
      border: imageUrl ? '3px solid black' : '3px dashed #275bbd',
      height: '200px',
    }"
    @dragover.prevent="onDragOver"
    @drop.prevent="onDrop"
  >
    <img
      id="image"
      height="200"
      aspect-ratio="1/1"
      :src="imageUrl ? imageUrl : imgPath"
      :style="{
        minWidth: imageUrl || imgPath ? '100%' : '0',
        maxHeight: '200px',
        objectFit: 'cover',
        borderRadius: '12px',
        display: 'block',
        maxWidth: '100%',
      }"
    />

    <button
      v-if="imageUrl"
      @click="cropImage"
      class="position-absolute bottom-0 right-0 pa-2 rounded-lg elevation-20"
    >
      Crop
    </button>
    <p
      v-if="!imgPath && !imageUrl"
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      Drop
      {{
        useRoute().fullPath === '/MyFiles' ? 'PDF file' : 'new account photo'
      }}
      here
    </p>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline"
          >The file upload was successful!</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
