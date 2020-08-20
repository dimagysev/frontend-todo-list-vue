import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.baseURL = 'http://todolist-backend/api/'

export default new Vuex.Store({
  state: {
    todoData: [],
    filterTodo: 'all'
  },
  getters: {
    getFilteredTodo: (state, getters) => {
      if (state.filterTodo === 'completed') {
        return getters.getCompleted
      }
      if (state.filterTodo === 'active') {
        return getters.getActive
      }
      return getters.getAllTodo
    },
    getFilter: state => state.filterTodo,
    getAllTodo: state => state.todoData,
    getActive: state => state.todoData.filter(item => item.completed === '0'),
    getCompleted: state => state.todoData.filter(item => item.completed === '1'),
    getRemaining: (state, getters) => getters.getActive.length,
    isCompletedAll: (state, getters) => getters.getRemaining === 0
  },
  mutations: {
    // eslint-disable-next-line no-return-assign
    setTodos: (state, data) => state.todoData = data,
    // eslint-disable-next-line no-return-assign
    changeStatus: (state, data) => state.todoData.find(item => item.id === data.id).completed = data.completed,
    // eslint-disable-next-line no-return-assign
    removeTodo: (state, id) => state.todoData = state.todoData.filter(item => item.id !== id),
    addTodo: (state, todo) => state.todoData.unshift(todo),
    // eslint-disable-next-line no-return-assign
    changeFilter: (state, filter) => state.filterTodo = filter
  },
  actions: {
    async getTodos ({ commit }) {
      const response = await axios.get('todos')
      const result = await response.data
      commit('setTodos', result)
    },
    async changeStatus ({ commit }, todo) {
      const response = await axios.put(
        `todos/${todo.id}`,
        { completed: todo.completed ? '1' : '0' }
      )
      const result = await response.data
      commit('changeStatus', result)
    },
    async changeStatusAll ({ commit, state }, status) {
      const response = await axios.patch(
        '/todos/change/status-all',
        { completed: status ? '1' : '0' }
      )
      const result = await response.data
      commit('setTodos', result)
    },
    async removeTodo ({ commit }, id) {
      await axios.delete(`todos/${id}`)
      commit('removeTodo', id)
    },
    async removeCompleted ({ getters, dispatch }) {
      const ids = getters.getCompleted.map(item => item.id)
      ids.forEach(item => dispatch('removeTodo', item))
    },
    async addTodo ({ commit }, todo) {
      const response = await axios.post('todos', {
        title: todo.title,
        completed: '0'
      })
      const result = await response.data
      commit('addTodo', result)
    },
    changeFilter ({ commit }, filter) {
      commit('changeFilter', filter)
    }
  }
})
