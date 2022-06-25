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
    login: function(state, {token, userId}){
      state.authToken = token;
      state.userId = userId;
      state.isLogin = true;
    }
  },
  plugins: [createPersistedState()],
})