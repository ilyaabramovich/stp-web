import Vue from 'vue'
import Buefy from 'buefy'
import Vuelidate from 'vuelidate'
import 'buefy/dist/buefy.css'
import store from '@/store/store'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(Vuelidate)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
