import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import DateFilter from './filters/date'
import EventSorter from './filters/sort-event'

Vue.filter('date', DateFilter)
Vue.filter('sortEvent', EventSorter)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
