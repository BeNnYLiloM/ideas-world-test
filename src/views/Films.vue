<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row class="mt-2">
        <v-col cols="12" sm="4" lg="3" xl="2">
          <sidebar typeMovie="films" @doFilter="filter" />
        </v-col>

        <v-col cols="12" sm="8" lg="9" xl="10">
          <v-row v-if="movieList">
            <v-col
              xl="3"
              lg="4"
              sm="6"
              cols="12"
              v-for="movie in movieList.results"
              :key="movie.id"
            >
              <film-card :data="movie" type="movie" />
            </v-col>
          </v-row>

          <v-row v-if="movieList" justify="center">
            <v-pagination
              class="my-10"
              v-model="page"
              :length="movieList.total_pages"
              :total-visible="12"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import filmsApi from '@/api/films'
import FilmCard from '@/components/FilmCard'
import Sidebar from '@/components/Sidebar'
import {filterQueryBuilder} from '@/utils/filterQueryBuilder'
import {mapState} from 'vuex'

export default {
  name: 'Films',
  components: {FilmCard, Sidebar},
  data() {
    return {
      movieList: null,
      page: 1,
      isFiltered: false,
    }
  },
  async created() {
    this.movieList = await filmsApi.getList()
  },
  computed: {
    ...mapState({
      sortBy: (state) => state.sort.sortBy,
      genreSelected: (state) => state.filterMovies.genreSelected,
      yearReleased: (state) => state.filterMovies.yearReleased,
    }),
  },
  methods: {
    filter(page) {
      if (page && this.page !== 1) {
        this.page = page
        return
      }

      const data = {
        sortBy: this.sortBy,
        genreSelected: this.genreSelected,
        yearReleased: this.yearReleased,
        page: page || this.page,
        type: 'films',
      }

      filmsApi.getListByFilter(filterQueryBuilder(data)).then((res) => {
        this.movieList = res
      })
    },
  },
  watch: {
    page() {
      window.scrollTo(0, 0)

      if (this.genreSelected.length || this.yearReleased) {
        this.filter()
      } else {
        filmsApi.getList(this.page).then((res) => (this.movieList = res))
      }
    },
    sortBy() {
      this.filter()
    },
  },
}
</script>

<style lang="scss">
.tag {
  margin-right: 14px;

  &.v-input--is-label-active {
    .v-input__slot .v-label {
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
    }
  }

  &.v-input--selection-controls {
    margin-top: 10px;
  }

  .v-input {
    &--selection-controls__input {
      position: absolute;
      opacity: 0;
      visibility: hidden;
    }

    &__slot {
      .v-label {
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 20px;
        padding: 4px 14px;
        font-size: 14px;
      }
    }
  }
}
</style>
