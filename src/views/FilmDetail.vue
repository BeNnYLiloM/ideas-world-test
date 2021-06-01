<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row v-if="details">
        <v-sheet rounded="lg" class="mt-8 d-flex flex-wrap col-12">
          <v-col cols="12" sm="3">
            <v-img :src="imageSrc(details.poster_path)" />
          </v-col>

          <v-col cols="12" sm="9">
            <h1 class="mb-6">{{ details.title }}</h1>

            <div class="mb-6">
              <h3 class="mb-2">About film</h3>
              <div>
                {{ details.overview }}
              </div>
            </div>

            <div class="mb-6">
              <h3>Genre</h3>
              <div class="d-flex">
                <div
                  v-for="genre in details.genres"
                  :key="genre.id"
                  class="mr-4"
                >
                  • {{ genre.name }}
                </div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="mb-2">Rating</h3>
              <v-row class="mx-0" align="center">
                <v-rating
                  :value="details.vote_average"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                  length="10"
                />
                <div class="grey--text ms-4">
                  {{ details.vote_average }}
                  ({{ details.vote_count }})
                </div>
              </v-row>
            </div>

            <div class="mb-6">
              <h3 clas="mb-2">Release</h3>
              <div class="grey--text">
                {{ details.release_date }}
              </div>
            </div>

            <div class="mb-6" v-if="type === 'movie'">
              <h3 class="mb-2">Duration</h3>
              <div class="grey--text">
                {{ duration(details.runtime) }}
              </div>
            </div>

            <div>
              <v-btn icon @click="toggleFavorite">
                <v-icon x-large :class="{'red--text': accountStates.favorite}">
                  mdi-heart
                </v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import filmsApi from '@/api/films'
import tvshowsApi from '@/api/tvshows'
import {IMAGE_W400_URL} from '@/utils/constants'

export default {
  name: 'FilmDetail',
  data() {
    return {
      details: null,
      accountStates: null,
      imageUrl: IMAGE_W400_URL,
      movieId: this.$route.params.id,
      type: this.$route.params.type,
    }
  },
  async created() {
    const payload = {
      id: this.movieId,
      sessionId: this.$store.state.auth.sessionId,
    }

    if (this.type === 'movie' || this.$route.path.indexOf('films') !== -1) {
      this.accountStates = await filmsApi.getAccountStates(payload)
      this.details = await filmsApi.getFilmDetails(this.movieId)
    } else {
      this.accountStates = await tvshowsApi.getAccountStates(payload)
      this.details = await tvshowsApi.getTvshowDetails(this.movieId)
    }
  },
  methods: {
    imageSrc(image) {
      return `${this.imageUrl}${image}`
    },
    duration(numb) {
      const h = Math.floor(numb / 60)
      let m = numb % 60

      if (m < 10) {
        m = '0' + m
      }

      return h + 'h ' + m + 'min'
    },
    toggleFavorite() {
      const payload = {
        accountId: this.$store.state.auth.accountDetails.id,
        sessionId: this.$store.state.auth.sessionId,
        mediaType: 'movie',
        mediaId: this.movieId,
        favorite: !this.accountStates.favorite,
      }
      const accountStatesPayload = {
        id: this.movieId,
        sessionId: this.$store.state.auth.sessionId,
      }

      if (this.type === 'movie' || this.$route.path.indexOf('films') !== -1) {
        filmsApi.toggleFavorite(payload).then(() => {
          filmsApi.getAccountStates(accountStatesPayload).then((res) => {
            this.accountStates = res
          })
        })
      } else {
        payload.mediaType = 'tv'

        tvshowsApi.toggleFavorite(payload).then(() => {
          tvshowsApi.getAccountStates(accountStatesPayload).then((res) => {
            this.accountStates = res
          })
        })
      }
    },
  },
}
</script>
