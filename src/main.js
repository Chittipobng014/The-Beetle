import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import { mapActions, mapGetters } from "vuex";
import store from './store'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { firestore, storage } from './firebase'

Vue.prototype.$db = firestore;
Vue.prototype.$storage = storage
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  methods:{
    ...mapActions(['addScannedBoxes']),
    init: function() {
      ble.startScan([], function(device) {
        if (device.name.startsWith("Beetle")) {
          //this.addScannedBoxes({...device})
          console.log(JSON.stringify(device));
        }
      }, function (err) {
        console.log(err);
      });
      setTimeout(ble.stopScan,
        10000,
        function() { },
        function() { }
      );
    }
  }
})

document.addEventListener('deviceready', app.init, function (err) {
  console.log(err);
})