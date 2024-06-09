<script setup>
const userData = ref(null)
const showPDF = ref(false)
const path = ref('')
const search = ref('')
const id = ref('')
const tableData = ref([])

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
  { title: 'Visibility', value: 'visibility', sortable: true },
  { title: 'Delete', value: 'delete', sortable: false },
]

async function fetchUserData() {
  const userIdCookied = useCookie('userId')

  if (!userIdCookied.value) {
    navigateTo(`/`)
    return
  }
  try {
    const response = await $fetch(
      `http://localhost:3001/users/${userIdCookied.value}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )

    userData.value = response
    id.value = response.user._id
    tableData.value = formatTableData(response.files)
  } catch (error) {
    navigateTo(`/`)
    console.error('Error fetching user data:', error)
  }
}

async function changeVisibility(id) {
  const index = tableData.value.findIndex((el) => el._id === id)
  const isVisible = tableData.value[index].visibility
  try {
    await $fetch(`http://localhost:3001/api/files/${id}`, {
      method: 'PATCH',
      body: { visibility: !isVisible },
      credentials: 'include',
    })

    tableData.value[index].visibility = !isVisible
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

async function deleteFile(id) {
  try {
    await $fetch(`http://localhost:3001/api/files/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    tableData.value = tableData.value.filter((el) => el._id !== id)
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

function togglePDF(str) {
  if (str) {
    path.value = str
  }

  showPDF.value = !showPDF.value
}

function refresh(obj) {
  const formatedObj = formatTableData([obj])[0]
  tableData.value.push(formatedObj)
}

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <div>
    <v-container fluid v-if="!userData">
      <v-row class="h-screen align-center justify-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </v-container>
    <div v-if="userData">
      <div class="d-flex justify-space-between mb-4 ga-4">
        <div class="w-50">
          <div class="bg-accent pa-4">
            <p class="bg-accent mr-12">
              Name:
              <b> {{ userData.user.name }}</b>
            </p>
            <p class=" ">
              Email:
              <b> {{ userData.user.email }}</b>
            </p>
          </div>
          <h1 class="mt-12 pb-4 d-flex">User Files</h1>
        </div>
        <DragAndDrop :userId="id" :onSuccess="refresh" />
      </div>

      <v-text-field
        v-model="search"
        label="Search"
        solo-inverted
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="tableData"
        item-key="_id"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:item.originalname="{ item }">
          <span class="clickable" @click="togglePDF(item.path)">{{
            item.originalname
          }}</span>
        </template>

        <template v-slot:item.visibility="{ item }">
          <v-icon @click="changeVisibility(item._id)">
            {{ item.visibility ? 'mdi-eye' : 'mdi-eye-off' }}
          </v-icon>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-icon @click="deleteFile(item._id)">mdi-delete</v-icon>
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
