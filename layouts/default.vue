<script setup>
const clipped = ref(false)
const drawer = ref(false)

const items = reactive([
  {
    icon: 'mdi-apps',
    title: 'Welcome',
    to: '/',
  },
  {
    icon: 'mdi-chart-bubble',
    title: 'My Files',
    to: '/MyFiles',
  },
  {
    icon: 'mdi-chart-bubble',
    title: 'All files',
    to: '/AllFiles',
  },
])
</script>

<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      temporary
      right
      fixed
      app
    >
      <v-list density="compact" nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          ><v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item>{{ item.title }}</v-list-item>
          </v-list-item-action></v-list-item
        >
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app>
      <v-btn
        icon
        @click.stop="drawer = !drawer"
        :style="{ marginLeft: drawer ? '256px' : '0' }"
      >
        <v-icon>mdi-{{ `chevron-${!drawer ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title> PDF Library </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>
