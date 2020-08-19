<template>
  <div class="wrap">
    <select v-model="selected" @change="changeFilter(selected)">
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TodoFilter',
  data () {
    return {
      selected: ''
    }
  },
  methods: mapActions(['changeFilter']),
  computed: mapGetters(['getFilter']),
  created () {
    this.selected = this.getFilter
  }
}
</script>

<style scoped lang="scss">
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
