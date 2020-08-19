import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.baseURL = 'http://todolist-backend/api/'

export default new Vuex.Store({
  state: {
    todoData: [],
    filterTodo: 'all',
    limit: 5
  },
  getters: {
    getAllTodo: state => {
      if (state.filterTodo === 'completed') {
        return state.todoData.filter(item => item.completed === '1')
      }
      if (state.filterTodo === 'active') {
        return state.todoData.filter(item => item.completed === '0')
      }
      return state.todoData
    },
    getFilter: state => state.filterTodo,
    getLimit: state => state.limit
  },
  mutations: {
    // eslint-disable-next-line no-return-assign
    setTodos: (state, data) => state.todoData = data,
    changeStatus: (state, data) => {
      state.todoData.forEach(item => {
        if (item.id === data.id) {
          item.completed = data.completed
        }
      })
    },
    // eslint-disable-next-line no-return-assign
    removeTodo: (state, id) => state.todoData = state.todoData.filter(item => item.id !== id),
    addTodo: (state, todo) => state.todoData.unshift(todo),
    // eslint-disable-next-line no-return-assign
    changeFilter: (state, filter) => state.filterTodo = filter,
    // eslint-disable-next-line no-return-assign
    changeLimit: (state, limit) => state.limit = limit
  },
  actions: {
    async getTodos ({ commit, state }) {
      const response = await axios.get(`todos?limit=${state.limit}`)
      const result = await response.data
      commit('setTodos', result.data)
    },
    async changeStatus ({ commit }, todo) {
      const response = await axios.put(
        `todos/${todo.id}`,
        {
          title: todo.title,
          completed: todo.completed ? '1' : '0'
        }
      )
      const result = await response.data
      commit('changeStatus', result.data)
    },
    async removeTodo ({ commit }, id) {
      await axios.delete(`todos/${id}`)
      commit('removeTodo', id)
    },
    async addTodo ({ commit }, todo) {
      const response = await axios.post('/todos', {
        title: todo.title,
        completed: '0'
      })
      const result = await response.data
      console.log(result)
      commit('addTodo', result.data)
    },
    changeFilter ({ commit, dispatch }, filter) {
      commit('changeFilter', filter)
      dispatch('getTodos')
    },
    changeLimit ({ commit, dispatch }, limit) {
      limit = parseInt(limit)
      commit('changeLimit', limit)
      dispatch('getTodos')
    }
  }
})
