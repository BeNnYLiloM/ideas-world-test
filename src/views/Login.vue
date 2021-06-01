<template>
  <v-main class="grey lighten-3">
    <v-container>
      <h1 class="text-center mb-10 mt-4">Welcome to KinoHD</h1>
      <v-row justify="center">
        <v-col cols="12" xl="3" lg="4" sm="6">
          <v-sheet rounded="lg" class="pa-5">
            <h2 class="mb-4">Login</h2>

            <error-form-message
              :errorText="errorMessage"
              v-if="requestErrors"
            />

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="login"
            >
              <v-text-field
                v-model="name"
                label="Username"
                required
                :rules="nameRules"
              />

              <v-text-field
                v-model="password"
                label="Password"
                required
                :rules="passwordRules"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
              />

              <v-btn
                class="mt-4"
                type="submit"
                :disabled="invalid || isSubmitting"
              >
                Login
              </v-btn>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import ErrorFormMessage from '@/components/ErrorFormMessage'
import {mapState} from 'vuex'

export default {
  name: 'Login',
  components: {ErrorFormMessage},
  data() {
    return {
      valid: true,
      name: '',
      password: '',
      nameRules: [(v) => !!v || 'Name is required'],
      passwordRules: [(v) => !!v || 'Password is required'],
      showPass: false,
    }
  },
  computed: {
    ...mapState({
      requestErrors: (state) => state.auth.error,
      errorMessage: (state) => state.auth.errorMessage,
      isSubmitting: (state) => state.auth.isSubmitting,
    }),
    invalid() {
      return !(this.password.length && this.name.length)
    },
  },
  methods: {
    login() {
      if (this.name.length !== 0 && this.password.length !== 0) {
        const credentials = {
          username: this.name,
          password: this.password,
          request_token: this.$store.state.auth.requestToken,
        }

        this.$store.dispatch('login', credentials).then(() => {
          this.$store
            .dispatch('createSessionId', {
              request_token: credentials.request_token,
            })
            .then(() => {
              const sessionId = this.$store.state.auth.sessionId

              this.$store.dispatch('getAccountDetails', sessionId)
            })

          this.$router.push('/films')
        })
      }
    },
  },
}
</script>
