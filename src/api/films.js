import {tmdbApi} from '@/api/axios'

const getList = (page = 1) => {
  return tmdbApi
    .get(`/discover/movie?page=${page}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Movie get list' error, " + e)
    })
}

const getGenreList = () => {
  return tmdbApi
    .get('/genre/movie/list')
    .then((res) => res.data.genres)
    .catch((e) => {
      throw new Error("'Movie get genre list' error, " + e)
    })
}

const getListByFilter = (query) => {
  return tmdbApi
    .get(`/discover/movie?${query}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Movie get list by genre' error, " + e)
    })
}

const getFilmDetails = (id) => {
  return tmdbApi
    .get(`/movie/${id}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Movie get details by id' error, " + e)
    })
}

const getAccountStates = (credentials) => {
  return tmdbApi
    .get(
      `/movie/${credentials.id}/account_states?session_id=${credentials.sessionId}`
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Get accounts states of films' error, " + e)
    })
}

const toggleFavorite = (credentials) => {
  return tmdbApi
    .post(
      `/account/${credentials.accountId}/favorite?session_id=${credentials.sessionId}`,
      {
        media_type: credentials.mediaType,
        media_id: credentials.mediaId,
        favorite: credentials.favorite,
      }
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Toggle favorite' error, " + e)
    })
}

const getFavorites = (payload) => {
  return tmdbApi
    .get(
      `/account/${payload.accountId}/favorite/movies?session_id=${payload.sessionId}`
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Get Favorite films' error, " + e)
    })
}

export default {
  getList,
  getGenreList,
  getListByFilter,
  getFilmDetails,
  getAccountStates,
  toggleFavorite,
  getFavorites,
}
