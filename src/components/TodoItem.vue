<template>
    <div class="todo-item">
      <div class="left">
        <input @change="change($event)" type="checkbox" :checked="parseInt(todoItem.completed)">
        <span
          @dblclick="isEdit = true"
          v-if="!isEdit"
          :class="{ completed: parseInt(todoItem.completed)}"
        >{{ todoItem.title }}</span>
        <input v-else v-focus type="text"
               v-model="title"
               @keyup.enter="doneEdit"
               @keyup.esc="cancelEdit"
               @blur="cancelEdit"
        >
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
  data () {
    return {
      isEdit: false,
      title: this.todoItem.title
    }
  },
  computed: {
    ...mapGetters(['isCompletedAll'])
  },
  methods: {
    ...mapActions(['updateTodo', 'removeTodo']),
    change (event) {
      this.updateTodo({
        id: this.todoItem.id,
        completed: event.target.checked ? '1' : '0'
      })
    },
    doneEdit () {
      this.isEdit = false
      if (this.title.trim() === '') {
        this.cancelEdit()
      } else {
        this.updateTodo({
          id: this.todoItem.id,
          title: this.title
        })
      }
    },
    cancelEdit () {
      this.isEdit = false
      this.title = this.todoItem.title
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
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

    & .left {
      padding-top: 5px;
    }

    & input[type="checkbox"]{
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
