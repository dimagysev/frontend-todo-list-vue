<template>
  <div class="wrap">
    <button :disabled="getCompleted.length === 0" @click="removeCompleted">Clear completed</button>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ClearCompleted',
  computed: {
    ...mapGetters(['getCompleted'])
  },
  methods: {
    ...mapActions(['removeCompleted'])
  }
}
</script>

<style scoped lang="scss">
  button{
    padding: 10px;
    border-radius: 5px;
    border: 1px #42b983 solid;
    background: #42b983;
    cursor: pointer;

    &:focus, &:active{
      outline: none;
    }
    &:disabled{
      cursor: auto;

      &:hover{
        background: #42b983;
      }
    }
    &:hover{
      background: #228159;
    }
  }
</style>
