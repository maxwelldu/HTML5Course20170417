import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {}
}
const mutations = {
  login (state) {
    let username = localStorage.getItem('username')
    let userid = localStorage.getItem('user_id')
    let token = localStorage.getItem('token')
    let avatar = localStorage.getItem('avatar')
    state.user = {
      username,
      userid,
      token,
      avatar
    }
  },
  logout (state) {
    state.user = {}
    localStorage.clear()
  }
}
const actions = {
  login ({ commit }) {
    commit('login')
  },
  logout ({ commit }) {
    commit('logout')
  }
}
const getters = {

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
