import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    authToken: ''
  },
  getters: {
   
  },
  mutations: {
    login: function(state, payload){
      state.authToken = payload;
    }
  },
  plugins: [createPersistedState()],
})