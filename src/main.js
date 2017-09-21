
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'

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
    firebase.initializeApp({
      apiKey: 'AIzaSyCW7iMeHJC5aDmpr0Xr0SVa8d0pAsg5bDs',
      authDomain: 'new-meetup-50881.firebaseapp.com',
      databaseURL: 'https://new-meetup-50881.firebaseio.com',
      projectId: 'new-meetup-50881',
      storageBucket: ''
    })
  }
})
