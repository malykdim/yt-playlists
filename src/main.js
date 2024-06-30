import { createApp } from 'vue'

import router from '../src/config/router.js'
import { projectAuth } from './config/firebase.js'

import App from './App.vue'

// global styles
import './assets/main.scss'

let app

projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
})

