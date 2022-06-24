import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    authToken: '',
    userId: '',
    isLogin: false
  },
  getters: {
    //authToken: state => state.authToken,
    //userId: state => state.userId,
    //isLogin: state => state.isLogin
  },
  mutations: {
    login: function(state, payload){
      state.authToken = payload.token;
      state.userId = payload.userId;
      state.isLogin = true;
    }
  },
  plugins: [createPersistedState()],
})