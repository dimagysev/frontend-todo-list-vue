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
    token: localStorage.getItem('access_token') || null
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
    isCompletedAll: (state, getters) => getters.getRemaining === 0,
    isAuth: state => !!state.token
  },
  mutations: {
    // eslint-disable-next-line no-return-assign
    setTodos: (state, data) => state.todoData = data,
    // eslint-disable-next-line no-return-assign
    updateTodo: (state, todo) => state.todoData.forEach(item => {
      if (item.id === todo.id) {
        item.title = todo.title
        item.completed = todo.completed
      }
    }),
    // eslint-disable-next-line no-return-assign
    removeTodo: (state, id) => state.todoData = state.todoData.filter(item => item.id !== id),
    addTodo: (state, todo) => state.todoData.unshift(todo),
    // eslint-disable-next-line no-return-assign
    changeFilter: (state, filter) => state.filterTodo = filter,
    setToken: (state, token) => {
      state.token = token
      localStorage.setItem('access_token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    clearToken: (state) => {
      localStorage.removeItem('access_token')
      state.token = null
    }
  },
  actions: {
    async getTodos ({ commit }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.get('todos')
        const result = await response.data
        commit('setTodos', result)
      } catch (e) {
        throw e
      }
    },
    async updateTodo ({ commit }, todo) {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.put(`todos/${todo.id}`, todo)
        const result = await response.data
        commit('updateTodo', result)
      } catch (e) {
        throw e
      }
    },
    async changeStatusAll ({ commit, state }, status) {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.patch(
          '/todos/change/status-all',
          { completed: status ? '1' : '0' }
        )
        const result = await response.data
        commit('setTodos', result)
      } catch (e) {
        throw e
      }
    },
    async removeTodo ({ commit }, id) {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.delete(`todos/${id}`)
        const data = await response.data
        commit('removeTodo', data.id)
      } catch (e) {
        throw e
      }
    },
    async removeCompleted ({ getters, dispatch }) {
      // eslint-disable-next-line no-useless-catch
      try {
        const ids = getters.getCompleted.map(item => item.id)
        ids.forEach(item => dispatch('removeTodo', item))
      } catch (e) {
        throw e
      }
    },
    async addTodo ({ commit }, todo) {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.post('todos', {
          title: todo.title,
          completed: '0'
        })
        const result = await response.data
        commit('addTodo', result)
      } catch (e) {
        throw e
      }
    },
    changeFilter ({ commit }, filter) {
      commit('changeFilter', filter)
    },
    async login ({ commit }, credentials) {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.post('login', credentials)
        const data = await response.data
        commit('setToken', data.token)
      } catch (e) {
        throw e
      }
    },
    async register ({ commit }, credentials) {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await axios.post('register', credentials)
        const data = await response.data
        commit('setToken', data.token)
      } catch (e) {
        throw e
      }
    },
    async logout ({ commit }) {
      // eslint-disable-next-line no-useless-catch
      try {
        await axios.post('logout')
        commit('clearToken')
      } catch (e) {
        throw e
      }
    }
  }
})
