import {tmdbApi} from '@/api/axios'

const getList = (page = 1) => {
  return tmdbApi
    .get(`/discover/tv?page=${page}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Tvshows get list' error, " + e)
    })
}

const getGenreList = () => {
  return tmdbApi
    .get('/genre/tv/list')
    .then((res) => res.data.genres)
    .catch((e) => {
      throw new Error("'Tvshow get genre list' error, " + e)
    })
}

const getListByFilter = (query) => {
  return tmdbApi
    .get(`/discover/tv?${query}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Tvshow get list by genre' error, " + e)
    })
}

const getTvshowDetails = (id) => {
  return tmdbApi
    .get(`/tv/${id}`)
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Tvshow get details by id' error, " + e)
    })
}

const getAccountStates = (credentials) => {
  return tmdbApi
    .get(
      `/tv/${credentials.id}/account_states?session_id=${credentials.sessionId}`
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Get account state of tvshows' error, " + e)
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
      `/account/${payload.accountId}/favorite/tv?session_id=${payload.sessionId}`
    )
    .then((res) => res.data)
    .catch((e) => {
      throw new Error("'Get Favorite tvshows' error, " + e)
    })
}

export default {
  getList,
  getGenreList,
  getListByFilter,
  getTvshowDetails,
  getAccountStates,
  toggleFavorite,
  getFavorites,
}
