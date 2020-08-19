<template>
  <div class="wrap">
    <select v-model="limit" @change="changeLimit(limit)">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'LimitTodo',
  data () {
    return {
      limit: ''
    }
  },
  methods: mapActions(['changeLimit']),
  computed: mapGetters(['getLimit']),
  created () {
    this.limit = this.getLimit
  }
}
</script>

<style scoped>
  .wrap{
    display: flex;
  }
  select{
    border: 1px solid #42b983;
    border-radius: 5px;
    padding: 10px 0;
    width: 100%;
  }
</style>
