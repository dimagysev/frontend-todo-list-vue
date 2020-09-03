<template>
  <div class="form-wrap">
    <form @submit.prevent="loginHandler">
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" class="input-text" type="text" id="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" class="input-text" type="password" id="password">
      </div>
      <div class="action">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    loginHandler () {
      this.login({
        email: this.email,
        password: this.password
      }).then(() => this.$router.push('/'))
    }
  }
}
</script>

<style scoped lang="scss">

</style>
