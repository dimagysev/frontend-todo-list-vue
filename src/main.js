import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    const token = localStorage.getItem('access_token')
    if (token) {
      this.$store.commit('setToken', token)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401 || error.response.status === 403) {
          this.$store.commit('clearToken')
          this.$router.push('/login')
        }
        throw error
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
