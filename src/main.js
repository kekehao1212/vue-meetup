
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import DateFilter from './filters/date'
import * as wilddog from 'wilddog'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    wilddog.initializeApp({
      authDomain: 'wd1793780581mqwydb.wilddog.com'
    })
  }
})
