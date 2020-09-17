//
// This Vuex store is ONLY used for Vuestro standalone instance
//

/* global Vue */
const Vuex = require('vuex');
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDarkUI: true,
    isSidebarMini: false,
  },
  getters: {
    isDarkUI(state) {
      return state.isDarkUI;
    },
    isSidebarMini(state) {
      return state.isSidebarMini;
    }
  },
  actions: {
    toggleIsDarkUI({ commit }) {
      commit('toggleIsDarkUI');
    },
    setSidebarMini({ commit }, val=true) {
      commit('setSidebarMini', val);
    },
  },
  mutations: {
    toggleIsDarkUI(state) {
      state.isDarkUI = !state.isDarkUI;
    },
    setSidebarMini(state, val) {
      state.isSidebarMini = val;
    },
  },
});