import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import sort from '@/store/modules/sort'
import filterMovies from '@/store/modules/filterMovies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    sort,
    filterMovies,
  },
})
