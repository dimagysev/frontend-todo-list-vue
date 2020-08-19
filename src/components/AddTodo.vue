<template>
  <div>
    <form @submit.prevent="submit">
      <div class="form-control">
        <input type="text" id="add_todo" v-model="title" >
        <input type="submit" value="Add task">
      </div>
    </form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'AddTodo',
  data () {
    return {
      title: ''
    }
  },
  methods: {
    ...mapActions(['addTodo']),
    submit () {
      if (this.title.trim()) {
        const todo = { title: this.title }
        this.addTodo(todo)
        this.title = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .form-control{
    display: flex;
    justify-content: space-between;
    border: 1px solid #42b983;
    border-radius: 5px;

    & input[type='text']{
      flex-grow: 2;
      border: none;
      border-radius: 5px;
    }
    & input[type='submit']{
      border: none;
      flex-grow: 1;
      padding: 10px;
      background: #42b983;

      &:hover{
        background: #228159;
      }
    }
  }
</style>
