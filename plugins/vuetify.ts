// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          dark: true,
          colors: {
            primary: '#1976d2',
            accent: '#424242',
            secondary: '#ff8f00',
            info: '#26a69a',
            warning: '#ffc107',
            error: '#dd2c00',
            success: '#00e676',
            // background: '#ff8f00',
            // surface: '#424242',
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
