<template>
  <div>
      <h2>Todo List</h2>
       <add-todo/>
       <div class="panel">
         <todo-filter/>
         <limit-todo/>
       </div>
        <div class="wrap">
          <div class="todo-wrap">
            <todo-item
              v-for="todoItem in getAllTodo" :key="todoItem.id"
              :todoItem="todoItem"
            />
          </div>
        </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem'
import AddTodo from '@/components/AddTodo'
import TodoFilter from '@/components/TodoFilter'
import LimitTodo from '@/components/LimitTodo'

export default {
  name: 'TodoList',
  components: { TodoItem, AddTodo, TodoFilter, LimitTodo },
  computed: {
    ...mapGetters(['getAllTodo'])
  },
  methods: {
    ...mapActions(['getTodos'])
  },
  created () {
    this.getTodos()
  }
}
</script>

<style scoped lang="scss">
  .panel{
    display: flex;
    justify-content: space-between;
  }
  .wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    & .todo-wrap{
      overflow: auto;
      display: block;
      width: 600px;
      height: 300px;
      padding: 10px;
      border: 1px solid cadetblue;
      border-radius: 5px;
    }
  }
</style>
