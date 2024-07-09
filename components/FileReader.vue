<script setup>
const props = defineProps({
  path: {
    type: String,
  },
  onClose: { type: Function },
})

const config = useRuntimeConfig()

const showReader = ref(true)

onBeforeUnmount(() => props.onClose())
</script>

<template>
  <v-dialog v-model="showReader" max-width="800">
    <v-card class="pa-2">
      <v-btn
        color="primary"
        class="w-20 mb-2 ml-auto"
        @click="showReader = false"
        >X</v-btn
      >

      <iframe
        :src="`${config.public.apiUrl}/${props.path}`"
        width="100%"
        height="1000px"
      ></iframe>
    </v-card>
  </v-dialog>
</template>
