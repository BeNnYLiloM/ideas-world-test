import authApi from '@/api/auth'
import {deleteLocalStorageItem, setLocalStorageItem} from '@/utils/localStorage'

const state = {
  isLoggedIn: false,
  isSubmitting: false,
  requestToken: null,
  sessionId: null,
  currentUser: null,
  accountDetails: null,
  error: false,
  errorMessage: null,
}

const actions = {
  async createRequestToken(ctx) {
    ctx.commit('startCreateRequestToken')

    const response = await authApi.createRequestToken()

    if (response) {
      ctx.commit('successCreateRequestToken', response.data.request_token)
    }
  },
  async createSessionId(ctx, payload) {
    ctx.commit('startCreateSessionId')

    const sessionId = await authApi.createSessionId(payload)

    if (sessionId) {
      setLocalStorageItem('session_id', sessionId.data.session_id)
      ctx.commit('successCreateSessionId', sessionId.data.session_id)
    }
  },
  async getAccountDetails(ctx, payload) {
    ctx.commit('startGetAccountDetails')

    const accountDetails = await authApi.getAccountDetails(payload)

    if (accountDetails) {
      setLocalStorageItem('account_id', accountDetails.id)
      ctx.commit('successGetAccountDetails', accountDetails)
    }
  },
  async login(ctx, payload) {
    ctx.commit('startLogin')

    const response = await authApi.login(payload)

    if (response.success) {
      ctx.commit('successLogin', payload)
      setLocalStorageItem('request_token', payload.request_token)
      setLocalStorageItem('current_user', payload.username)
    } else {
      ctx.commit('failureLogin', response)
    }
  },
  logout(ctx) {
    ctx.commit('logout')
    deleteLocalStorageItem('request_token')
    deleteLocalStorageItem('account_id')
    deleteLocalStorageItem('session_id')
    deleteLocalStorageItem('current_user')
  },
}

const mutations = {
  startCreateRequestToken(state) {
    state.requestToken = null
  },
  successCreateRequestToken(state, payload) {
    state.requestToken = payload
  },

  startCreateSessionId(state) {
    state.sessionId = null
  },
  successCreateSessionId(state, payload) {
    state.sessionId = payload
  },

  startGetAccountDetails(state) {
    state.accountDetails = null
  },
  successGetAccountDetails(state, payload) {
    state.accountDetails = payload
  },

  startLogin(state) {
    state.isSubmitting = true
    state.error = false
    state.errorMessage = null
  },
  successLogin(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload.username
    state.isLoggedIn = true
  },
  failureLogin(state, payload) {
    state.isSubmitting = false
    state.error = true
    state.errorMessage = payload.status_message
  },

  logout(state) {
    state.requestToken = null
    state.currentUser = null
    state.sessionId = null
    state.accountDetails = null
  },
}

export default {
  state,
  actions,
  mutations,
}
