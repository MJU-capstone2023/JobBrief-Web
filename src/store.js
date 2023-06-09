import { createStore } from 'vuex';

const store = createStore({
  state: {
    accessToken: null
  },
  mutations: {
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('SET_ACCESS_TOKEN', payload.accessToken);
    }
  }
});

export default store;
