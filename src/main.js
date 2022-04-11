import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./vuexstore";
import { createPinia, PiniaVuePlugin } from "pinia";

//import firebase from "firebase";
import vuetify from "./plugins/vuetify";

import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

Vue.config.productionTip = false;
// const firebaseConfig = {
//   apiKey: "AIzaSyCR8_hZrOLRW2dXEU8DopMAqjqyhVmA008",
//   authDomain: "initial-329ec.firebaseapp.com",
//   projectId: "initial-329ec",
//   storageBucket: "initial-329ec.appspot.com",
//   messagingSenderId: "617378247085",
//   appId: "1:617378247085:web:732992dd9bca75aef73124",
//   measurementId: "G-Z65573978P",
// };
// firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
