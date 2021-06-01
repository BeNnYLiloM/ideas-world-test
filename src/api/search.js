import {tmdbApi} from '@/api/axios'

const search = (searchString) => {
  return tmdbApi
    .get(`/search/multi?query=${searchString}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Search' error, " + e)
    })
}

export default {
  search,
}
