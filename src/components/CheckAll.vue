<template>
 <div class="wrap">
   Check all <input type="checkbox"
                    @change="changeStatusAll($event.target.checked)"
                    :checked="isCompletedAll && getAllTodo.length !== 0"
                    :disabled="getAllTodo.length === 0"
              >
 </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CheckAll',

  computed: {
    ...mapGetters(['isCompletedAll', 'getAllTodo'])
  },
  methods: {
    ...mapActions(['changeStatusAll'])
  }
}
</script>

<style scoped lang="scss">
.wrap{
  border:1px solid #42b983;
  padding: 10px;
  border-radius: 5px;
  background: #cccc;
}
</style>
