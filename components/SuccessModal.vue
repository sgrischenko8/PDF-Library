<script setup>
const successVisible = ref(true)
</script>

<template>
  <v-dialog v-model="successVisible" max-width="500">
    <v-card>
      <v-card-title>
        <slot name="text">Completed</slot>
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" @click="successVisible = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
