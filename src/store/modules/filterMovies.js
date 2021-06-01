const state = {
  genreSelected: [],
  yearReleased: '',
}

const mutations = {
  setGenreSelected(state, payload) {
    state.genreSelected = payload
  },
  setYearReleased(state, year) {
    state.yearReleased = year
  },
}

export default {
  state,
  mutations,
}
