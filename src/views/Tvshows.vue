<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row class="mt-2">
        <v-col cols="12" sm="4" lg="3" xl="2">
          <sidebar typeMovie="tv" @doFilter="filter" />
        </v-col>

        <v-col cols="12" sm="8" lg="9" xl="10">
          <v-row v-if="tvshowList">
            <v-col
              xl="3"
              lg="4"
              sm="6"
              cols="12"
              v-for="movie in tvshowList.results"
              :key="movie.id"
            >
              <film-card :data="movie" type="tvshow" />
            </v-col>
          </v-row>

          <v-row v-if="tvshowList" justify="center">
            <v-pagination
              class="my-10"
              v-model="page"
              :length="tvshowList.total_pages"
              :total-visible="12"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import tvshowApi from '@/api/tvshows'
import FilmCard from '@/components/FilmCard'
import Sidebar from '@/components/Sidebar'
import {filterQueryBuilder} from '@/utils/filterQueryBuilder'
import {mapState} from 'vuex'

export default {
  name: 'Tvshows',
  components: {Sidebar, FilmCard},
  data() {
    return {
      tvshowList: null,
      page: 1,
      isFiltered: false,
    }
  },
  async created() {
    this.tvshowList = await tvshowApi.getList()
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
        page: this.page,
        type: 'tv',
      }

      console.log(filterQueryBuilder(data))

      tvshowApi.getListByFilter(filterQueryBuilder(data)).then((res) => {
        this.tvshowList = res
      })
    },
  },
  watch: {
    page() {
      window.scrollTo(0, 0)

      if (this.genreSelected.length || this.yearReleased) {
        this.filter()
      } else {
        tvshowApi.getList(this.page).then((res) => (this.tvshowList = res))
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
