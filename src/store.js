//
// This Vuex store is ONLY used for Vuestro standalone instance
//

/* global Vue, _ */
const Vuex = require('vuex');
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDarkUI: true,
    isSidebarMini: false,
    notifications: [
      {
        _id: 'testid1',
        title: 'Clickable Alert',
        description: 'There\'s a new notifications component!',
        path: '/popups/notifications',
        created: new Date(),
        unread: true,
      },
      {
        _id: 'testid2',
        title: 'Non-clickable Alert',
        description: 'Just wanted to let you know you\'re awesome!',
        created: new Date(),
        unread: true,
      },
      {
        _id: 'testid3',
        title: 'Already-read Alert',
        description: 'This alert was previously clicked on',
        created: new Date(),
        unread: false,
      },
    ],
    fileTree: [
      {
        name: 'Documents',
        path: '/Documents',
        children: [
          ]
      }
      
    ],
  },
  getters: {
    isDarkUI(state) {
      return state.isDarkUI;
    },
    isSidebarMini(state) {
      return state.isSidebarMini;
    },
    notifications(state) {
      return state.notifications;
    },
  },
  actions: {
    toggleIsDarkUI({ commit }) {
      commit('toggleIsDarkUI');
    },
    setSidebarMini({ commit }, val=true) {
      commit('setSidebarMini', val);
    },
    notificationRead({ commit }, id) {
      commit('notificationRead', id);
    },
    addNotification({ commit }, obj) {
      commit('addNotification', obj);
    },
    notificationsClear({ commit }) {
      commit('notificationsClear');
    },
  },
  mutations: {
    toggleIsDarkUI(state) {
      state.isDarkUI = !state.isDarkUI;
    },
    setSidebarMini(state, val) {
      state.isSidebarMini = val;
    },
    notificationRead(state, _id) {
      let n = _.find(state.notifications, { _id });
      Vue.set(n, 'unread', false);
    },
    addNotification(state, obj) {
      state.notifications.push(obj);
    },
    notificationsClear(state) {
      state.notifications = [];
    },
  },
});