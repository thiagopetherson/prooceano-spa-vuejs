import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useAuthStore = defineStore({
  id: 'authUser',
  state: () => ({
    user: LocalStorage.getItem('user') ? LocalStorage.getItem('user') : null,
    token: LocalStorage.getItem('token') ? LocalStorage.getItem('token') : null
  }),
  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user
  },
  actions: {
    setUser (user) {
      LocalStorage.set('user', user)
      this.user = user
    },
    setToken (token) {
      LocalStorage.set('token', token)
      this.token = token
    },
    logoutUser () {
      // LocalStorage.set('user', null)
      // LocalStorage.set('token', null)
      localStorage.clear()
      this.user = null
      this.token = null
    }
  }
})
