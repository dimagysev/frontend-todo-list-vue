<template>
    <div class="todo-item">
      <div>
        <input @change="change($event)" type="checkbox" :checked="parseInt(todoItem.completed)">
        <span :class="{ completed: parseInt(todoItem.completed)}">{{ todoItem.title }}</span>
      </div>
      <span class="remove-item" @click="removeTodo(todoItem.id)">&times;</span>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TodoItem',
  props: {
    todoItem: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['isCompletedAll'])
  },
  methods: {
    ...mapActions(['changeStatus', 'removeTodo']),
    change (event) {
      this.changeStatus({
        id: this.todoItem.id,
        completed: event.target.checked
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .todo-item{
    display: flex;
    border: 1px solid #42b983;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 3px;
    justify-content: space-between;

    &:hover{
      background: #42b983;
    }

    & input{
      margin-right: 10px;
      cursor: pointer;
    }

    & .remove-item{
      font-size: 24px;
      color: red;
      cursor: pointer;
    }
    & .completed{
      text-decoration: line-through;
    }
  }
</style>
