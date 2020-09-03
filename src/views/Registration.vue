<template>
  <div class="form-wrap">
    <form @submit.prevent="registerHandler">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" class="input-text" type="text" id="name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" class="input-text" type="text" id="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" class="input-text" type="password" id="password">
      </div>
      <div class="action">
        <button type="submit">SingUp</button>
      </div>
    </form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      name: ''
    }
  },
  methods: {
    ...mapActions(['register']),
    registerHandler () {
      this.register({
        name: this.name,
        email: this.email,
        password: this.password
      }).then(() => this.$router.push('/'))
    }
  }
}
</script>

<style scoped>

</style>
