import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createVuetify } from 'vuetify'
// import vuetify from './plugins/vuetify'
import * as components from 'vuetify/lib/components'
import * as directives from 'vuetify/lib/directives'
import { loadFonts } from './plugins/webfontloader'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

loadFonts()

const vuetify= createVuetify({
  components,
  directives,
})

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
