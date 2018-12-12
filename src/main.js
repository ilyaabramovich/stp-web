import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import './../node_modules/bulma/css/bulma.css';

Vue.config.productionTip = false
Vue.use(VModal)

new Vue({
  render: h => h(App),
}).$mount('#app')
