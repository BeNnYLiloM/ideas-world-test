<template>
  <v-app>
    <v-app-bar app dark>
      <v-container>
        <navbar v-if="currentUser" />
      </v-container>
    </v-app-bar>

    <router-view />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import {mapState} from 'vuex'
import {getLocalStorageItem} from '@/utils/localStorage'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  created() {
    const requestToken = getLocalStorageItem('request_token')
    const currentUser = getLocalStorageItem('current_user')
    const sessionId = getLocalStorageItem('session_id')

    if (!requestToken || !currentUser) {
      this.$store.dispatch('createRequestToken')
      this.$router.push('/login')
    } else {
      // this.$router.push('/films')
      this.$store.commit('successCreateRequestToken', requestToken)
      this.$store.commit('successLogin', {username: currentUser})
      this.$store.commit('successCreateSessionId', sessionId)
      this.$store.dispatch('getAccountDetails', sessionId)
    }
  },
  computed: {
    ...mapState({
      requestToken: (state) => state.auth.requestToken,
      currentUser: (state) => state.auth.currentUser,
    }),
  },
}
</script>
