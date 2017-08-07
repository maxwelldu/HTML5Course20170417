import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const state = {
  sum: 0,
  navList: []
}
const mutations = {
  increment (state) {
    state.sum++
  },
  setNavData (state, navListData) {
    state.navList = navListData
  }
}
const actions = {
  increment ({ commit }) {
    commit('increment')
  },
  getNavData ({ commit }) {
    // 请求api
    axios.get('http://h6.duchengjiu.top/shop/api_cat.php').then((response) => {
      console.log(response)
      commit('setNavData', response.data.data)
    })
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
