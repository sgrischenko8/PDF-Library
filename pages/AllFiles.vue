<script setup>
const allFiles = ref(null)
const showPDF = ref(false)
const path = ref('')
const search = ref('')

const headers = [
  { title: 'Name', value: 'originalname', sortable: true },
  {
    title: 'Page count',
    value: 'numberOfPages',
    sortable: true,
  },
  { title: 'Size (kb)', value: 'size', sortable: true },
  { title: 'Format', value: 'format' },
  { title: 'Upload Date', value: 'uploadDate', sortable: true },
  { title: 'Uploaded by', value: 'uploadedByUser', sortable: true },
]

async function fetchAllFiles() {
  try {
    const response = await $fetch('http://localhost:3001/api/files', {
      method: 'GET',
      credentials: 'include',
    })
    allFiles.value = formatTableData(response)
  } catch (error) {
    navigateTo(`/`)
    console.error('Error fetching user data:', error)
  }
}

function togglePDF(str) {
  if (str) {
    path.value = str
  }
  showPDF.value = !showPDF.value
}

onMounted(() => {
  const userIdCookied = useCookie('userId')
  if (!userIdCookied.value) {
    navigateTo(`/`)
    return
  }
  fetchAllFiles()
})
</script>

<template>
  <div>
    <v-container fluid v-if="!allFiles">
      <v-row class="h-screen align-center justify-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </v-container>
    <div v-if="allFiles">
      <h1 class="mb-4">Files library</h1>
      <v-text-field
        v-model="search"
        label="Search"
        solo-inverted
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="allFiles"
        item-key="_id"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:item.originalname="{ item }">
          <span class="clickable" @click="togglePDF(item.path)">{{
            item.originalname
          }}</span>
        </template>
      </v-data-table>

      <FileReader v-if="showPDF" :onClose="togglePDF" :path="path" />
    </div>
  </div>
</template>

<style scoped>
.clickable {
  cursor: pointer;
  color: white;
}

.clickable:hover {
  color: rgb(65, 92, 216);
  text-decoration: underline;
}
</style>
