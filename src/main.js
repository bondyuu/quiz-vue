import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import BootstrapVue3 from 'bootstrap-vue-3'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import VueWriter from 'vue-writer'
import VueSweetalert2 from 'vue-sweetalert2'

createApp(App).use(VueSweetalert2).use(VueWriter).use(BootstrapVue3).use(BootstrapIconsPlugin).use(store).use(router).mount('#app')
