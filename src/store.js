//
// This Vuex store is ONLY used for Vuestro standalone instance
//

/* global Vue */
const Vuex = require('vuex');
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDarkUI: true,
  },
  getters: {
    isDarkUI(state) {
      return state.isDarkUI;
    },
  },
  actions: {
    toggleIsDarkUI({ commit }) {
      commit('toggleIsDarkUI');
    },
  },
  mutations: {
    toggleIsDarkUI(state) {
      state.isDarkUI = !state.isDarkUI;
    },
  },
});