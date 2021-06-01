const state = {
  sortByItems: [
    {name: 'Popularity Descending', value: 'popularity.desc'},
    {name: 'Popularity Ascending', value: 'popularity.asc'},
    {name: 'Rating Descending', value: 'vote_average.desc'},
    {name: 'Rating Ascending', value: 'vote_average.asc'},
    {name: 'Release Date Descending', value: 'primary_release_date.desc'},
    {name: 'Release Date Ascending', value: 'primary_release_date.asc'},
    {name: 'Title (A-Z)', value: 'title.asc'},
    {name: 'Title (Z-A)', value: 'title.desc'},
  ],
  sortBy: {name: 'Popularity Descending', value: 'popularity.desc'},
}

const mutations = {
  setSortBy(state, sortBy) {
    state.sortBy = sortBy
  },
}

export default {
  state,
  mutations,
}
