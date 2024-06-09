<script setup>
const userIdCookied = useCookie('userId')
const currentDialog = ref(null)
const dialogVisible = ref(false)
const currentSuccsessDialog = ref(null)
const name = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const errorMessage = ref('')
const userPhotoPath = ref('')
const userDatas = ref(null)
const showPassword = ref(false)
const showPassword2 = ref(false)

function onSubmit() {
  if (currentDialog.value === 'sign') {
    addUser()
  }
  if (currentDialog.value === 'login') {
    login()
  }
  if (currentDialog.value === 'changeUserData') {
    updateUser()
  }
}

const authTitles = {
  sign: 'Create account',
  login: 'Login',
  changeUserData: 'Change account data',
}

function onClose() {
  errorMessage.value = ''
  currentDialog.value = null
  dialogVisible.value = false
}

function openDialog(dialog) {
  currentDialog.value = dialog
}

async function addUser() {
  try {
    await $fetch('http://localhost:3001/users/register', {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
      },
      credentials: 'include',
    })

    currentSuccsessDialog.value = 'sign'
    onClose()
  } catch (error) {
    console.log('Error adding user:', error.response._data.message)
    errorMessage.value = error.response._data.message
  }
}

async function login() {
  try {
    const response = await $fetch('http://localhost:3001/users/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
      credentials: 'include',
    })

    onClose()
    userDatas.value = response
    userIdCookied.value = response._id
  } catch (error) {
    console.error('Error logging user:', error)
    errorMessage.value = error.response._data.message
  }
}

async function logout() {
  try {
    await $fetch('http://localhost:3001/users/logout', {
      method: 'POST',
      credentials: 'include',
    })
    currentSuccsessDialog.value = 'logout'
    errorMessage.value = ''
    userDatas.value = null
    userIdCookied.value = ''
  } catch (error) {
    console.error('Error logging user:', error)
    userIdCookied.value = ''
    errorMessage.value = error.response._data.message
  }
}

async function getUser() {
  try {
    if (!userIdCookied.value) {
      return
    }
    const response = await $fetch(`http://localhost:3001/users/current`, {
      method: 'GET',
      credentials: 'include',
    })

    userDatas.value = response
    if (response.photo) {
      userPhotoPath.value = `http://localhost:3001/${response.photo
        .toString()
        .replaceAll(/\\/g, '/')}`
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    userIdCookied.value = null
  }
}

async function updateUser() {
  if (password.value !== password2.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  const updateData = {}
  if (name.value) {
    updateData.name = name.value
  }
  if (password.value) {
    updateData.password = password.value
  }

  if (Object.keys(updateData).length === 0) {
    errorMessage.value = 'No data to update'
    return
  }

  userIdCookied.value = userDatas.value._id
  try {
    const response = await $fetch(
      `http://localhost:3001/users/${userDatas.value._id}`,
      {
        method: 'PATCH',
        body: updateData,
        credentials: 'include',
      }
    )

    onClose()
    userDatas.value = response

    name.value = ''
    password.value = ''
    password2.value = ''
  } catch (error) {
    console.error('Error updating user data:', error)
    errorMessage.value = error.response._data.message
  }
}

function refresh(path) {
  userPhotoPath.value = `http://localhost:3001/${path}`
  getUser()
}

function toggleVisibility() {
  showPassword.value = !showPassword.value
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <div>
    <v-row class="d-block">
      <v-col class="text-right ml-auto">
        <v-btn
          v-if="!userIdCookied"
          color="primary"
          class="mr-4"
          @click="openDialog('sign'), (dialogVisible = true)"
          >Sign in</v-btn
        >
        <v-btn
          v-if="!userIdCookied"
          color="primary"
          @click="openDialog('login'), (dialogVisible = true)"
          >Log in</v-btn
        >
        <v-btn
          v-if="userIdCookied"
          class="mr-4 mb-4"
          color="primary"
          @click="logout"
          >Log out</v-btn
        >
        <v-btn
          v-if="userIdCookied"
          color="primary"
          class="mb-4"
          @click="openDialog('changeUserData'), (dialogVisible = true)"
          >Change data</v-btn
        >
        <DragAndDrop
          v-if="userDatas"
          :userId="userIdCookied"
          :onSuccess="refresh"
          :imgPath="userPhotoPath"
        />
      </v-col>
      <div v-if="userIdCookied && userDatas" class="text-right pr-4">
        <p>{{ userDatas.name }}</p>
        <p>{{ userDatas.email }}</p>
      </div>
    </v-row>

    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title>
          <span>{{ authTitles[currentDialog] }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-if="currentDialog !== 'login'"
            v-model="name"
            label="Name"
            aria-required="true"
          ></v-text-field>
          <v-text-field
            v-if="currentDialog !== 'changeUserData'"
            v-model="email"
            label="Email"
            aria-required="true"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="password"
            :type="showPassword ? 'text' : 'password'"
            aria-required="true"
          >
            <v-icon
              @click="toggleVisibility"
              class="position-absolute right-0 pr-4"
            >
              {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
            </v-icon></v-text-field
          >
          <v-text-field
            v-if="currentDialog === 'changeUserData'"
            v-model="password2"
            label="Repeat new password"
            :type="showPassword2 ? 'text' : 'password'"
            aria-required="true"
          >
            <v-icon
              @click="showPassword2 = !showPassword2"
              class="position-absolute right-0 pr-4"
            >
              {{ showPassword2 ? 'mdi-eye' : 'mdi-eye-off' }}
            </v-icon>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <p v-if="errorMessage" class="errorMessage text-left mr-auto pl-4">
            {{ errorMessage }}
          </p>
          <v-btn color="primary" @click="onClose">Close</v-btn>
          <v-btn color="primary" @click="onSubmit">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Register success window -->
    <SuccessModal v-if="currentSuccsessDialog === 'sign'">
      <template #text>Registration completed successfully!</template>
    </SuccessModal>

    <SuccessModal v-if="currentSuccsessDialog === 'changeUserData'">
      <template #text>User data updated successfully</template>
    </SuccessModal>

    <!-- Logout window -->
    <SuccessModal v-if="currentSuccsessDialog === 'logout'">
      <template #text>You have Log out successfully</template>
    </SuccessModal>
  </div>

  <v-container fluid v-if="!userDatas">
    <v-row class="h-screen align-center justify-center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>
<style scoped>
.errorMessage {
  color: #dd2c00;
}
</style>
