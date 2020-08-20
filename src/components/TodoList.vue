<template>
  <div>
      <h2>Todo List</h2>
       <add-todo/>
       <div class="panel">
         <todo-filter/>
         <check-all/>
         <clear-completed/>
         <remaining/>
       </div>
        <div class="wrap">
          <div class="todo-wrap" v-if="getFilteredTodo.length > 0">
            <todo-item
              v-for="todoItem in getFilteredTodo" :key="todoItem.id"
              :todoItem="todoItem"
            />
          </div>
          <div class="todo-wrap" v-else >Список пуст</div>
        </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem'
import AddTodo from '@/components/AddTodo'
import TodoFilter from '@/components/TodoFilter'
import Remaining from '@/components/Remaining'
import CheckAll from '@/components/CheckAll'
import ClearCompleted from '@/components/ClearCompleted'

export default {
  name: 'TodoList',
  components: { TodoItem, AddTodo, TodoFilter, Remaining, CheckAll, ClearCompleted },
  computed: {
    ...mapGetters(['getFilteredTodo'])
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
