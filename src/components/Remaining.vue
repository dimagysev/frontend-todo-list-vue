<template>
  <div class="wrap">
      Left: {{ getRemaining }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Remaining',
  computed: mapGetters(['getRemaining'])
}
</script>

<style scoped>
  .wrap{
    border:1px solid #42b983;
    padding: 10px;
    border-radius: 5px;
    background: #cccc;
  }
</style>
