<template>
  <v-main class="grey lighten-3">
    <v-container>
      <h1 class="mb-4">Favorites</h1>
      <v-row>
        <v-col cols="12">
          <v-sheet rounded="lg" class="pa-5 mb-10" v-if="movies">
            <h2 class="mb-4">Films</h2>

            <v-row>
              <v-col
                lg="3"
                sm="4"
                cols="12"
                v-for="movie in movies.results"
                :key="movie.id"
              >
                <film-card :data="movie" type="movie" />
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet rounded="lg" class="pa-5 mb-10" v-if="tvshows">
            <h2 class="mb-4">TVShows</h2>

            <v-row>
              <v-col
                lg="3"
                sm="4"
                cols="12"
                v-for="movie in tvshows.results"
                :key="movie.id"
              >
                <film-card :data="movie" type="tvshow" />
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import FilmCard from '@/components/FilmCard'
import filmApi from '@/api/films'
import tvshowsApi from '@/api/tvshows'
import {getLocalStorageItem} from '@/utils/localStorage'

export default {
  name: 'Favorites',
  components: {FilmCard},
  data() {
    return {
      movies: null,
      tvshows: null,
    }
  },
  async created() {
    const accountId = getLocalStorageItem('account_id')
    const payload = {
      accountId: accountId,
      sessionId: this.$store.state.auth.sessionId,
    }

    this.movies = await filmApi.getFavorites(payload)
    this.tvshows = await tvshowsApi.getFavorites(payload)
  },
}
</script>
