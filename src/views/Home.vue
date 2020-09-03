<template>
  <div class="home">
    <a href="!#" @click.prevent="logoutHandler">Logout</a>
    <TodoList/>
  </div>
</template>

<script>

import TodoList from '@/components/TodoList'
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    TodoList
  },
  methods: {
    ...mapActions(['logout']),
    logoutHandler () {
      this.logout().then(() => this.$router.push('/login'))
    }
  }
}
</script>

<style scoped lang="scss">

</style>
