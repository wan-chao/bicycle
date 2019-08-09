import Vue from 'vue'
import Vuex from 'vuex'
import vuexModules from './modules'

Vue.use(Vuex);


const state = {
  isLogin:localStorage.eleToken?true:false,
}

const mutations = {
  SET_LOGIN(state,data){
    state.isLogin=data
  }
}

const actions = {
  setLogin:({commit},isLogin)=>{
    commit('SET_LOGIN',isLogin)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: vuexModules
})
