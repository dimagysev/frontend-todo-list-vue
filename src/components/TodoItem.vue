<template>
    <div class="todo-item">
      <div>
        <input @change="change" type="checkbox" :checked="completed">
        <span :class="{ completed: completed }">{{ title }}</span>
      </div>
      <span class="remove-item" @click="removeTodo(id)">&times;</span>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'TodoItem',
  props: {
    todoItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      id: this.todoItem.id,
      title: this.todoItem.title,
      completed: parseInt(this.todoItem.completed)
    }
  },
  methods: {
    ...mapActions(['changeStatus', 'removeTodo']),
    change () {
      this.changeStatus({
        id: this.id,
        title: this.title,
        completed: this.completed = !this.completed
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
