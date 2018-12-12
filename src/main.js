import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import store from './store'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { firestore, storage } from './firebase'
import { microgear } from './components/customizes/Remote'

Vue.prototype.$db = firestore;
Vue.prototype.$storage = storage
Vue.prototype.$remote = microgear

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  methods: {
    bleScan: function () {
      ble.startScan([], async function (device) {

      }, function (err) {
        console.log(err);
      });
      setTimeout(function () {
        ble.stopScan(
          function () { console.log("Scan complete"); },
          function () { console.log("stopScan failed"); }
        );
      }, 5000);
      StatusBar.hide()
      setInterval(function () {
        ble.startScan([], async function (device) {
          // console.log(
          //   device.name,
          //   device.id
          // )
          // if (device.id == 'E44BC01C-0841-ADD1-F181-641272D50DC5') {
          //   let data = await blelib.bleConnect(device.id)
          //   let open = await blelib.openBox(data)
          //   console.log(open)
          //   let close = await blelib.closeBox(data)
          //   console.log(close)
          //   setTimeout(() => {
          //     blelib.bleDisconnect(device.id)
          //   }, 6000);
          // }
        }, function (err) {
          console.log(err);
        });
        setTimeout(function () {
          ble.stopScan(
            function () { console.log("Scan complete"); },
            function () { console.log("stopScan failed"); }
          );
        }, 10000);
      }, 11000)
    }
  },
  hideStatusBar: function () {
    StatusBar.hide()
  }
})

document.addEventListener('deviceready', app.bleScan, function (err) {
  console.log(err);
})