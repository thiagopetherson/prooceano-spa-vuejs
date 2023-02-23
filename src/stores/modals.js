import { defineStore } from 'pinia'

export const useModalsStore = defineStore({
  id: 'modals',
  state: () => ({
    modalGraph: false
  }),
  getters: {
    getModalGraph () {
      return this.modalGraph
    }
  },
  actions: {
    setModalGraph (value) {
      this.modalGraph = value
    }   
  }
})