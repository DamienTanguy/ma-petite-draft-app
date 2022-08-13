import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuelidate from 'vuelidate'
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'

/*Socket*/
//import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client'

if(window.location.hostname === 'localhost'){
	//Dev
	console.log('Dev')
	Vue.prototype.$socket = io(`http://localhost:3000`)//server adress
}else{
	//Prod
	console.log('Prod')
	//const socket = io.connect(window.location.hostname)
	Vue.prototype.$socket = io.connect(window.location.hostname)
}

//Vue.use(VueSocketIOExt, io(`http://localhost:3000`), { store })

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

