import {tmdbApi} from '@/api/axios'

const createRequestToken = () => {
  return tmdbApi
    .get('/authentication/token/new')
    .then((res) => res)
    .catch((e) => {
      throw new Error("'Get new request_token' error, " + e)
    })
}

const createSessionId = (requestToken) => {
  return tmdbApi
    .post('/authentication/session/new', requestToken)
    .then((res) => res)
    .catch((e) => {
      throw new Error("'Create session' error, " + e)
    })
}

async function login(credentials) {
  return await tmdbApi
    .post('authentication/token/validate_with_login', credentials)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      return e.response.data
    })
}

const getAccountDetails = (sessionId) => {
  return tmdbApi.get(`/account?session_id=${sessionId}`).then((res) => res.data)
}

export default {
  createRequestToken,
  createSessionId,
  login,
  getAccountDetails,
}
