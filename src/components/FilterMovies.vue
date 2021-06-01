<template>
  <v-sheet rounded="lg" class="mb-8">
    <v-list color="transparent">
      <v-list-item v-if="genreList">
        <v-list-item-content>
          <v-list-item-title>Genre</v-list-item-title>
          <v-checkbox
            class="tag"
            v-model="genreSelected"
            v-for="item in genreList"
            :key="item.id"
            :label="item.name"
            :id="String(item.id)"
            :value="item.id"
            :hide-details="true"
          />
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1"></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-2"> Release dates </v-list-item-title>
          <v-select v-model="yearReleased" :items="yearList" label="Year" />
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1"></v-divider>

      <v-list-item>
        <v-btn
          class="primary"
          :block="true"
          :disabled="isDisableShowBtn"
          @click="filter"
        >
          Show
        </v-btn>
      </v-list-item>

      <v-list-item v-if="genreSelected.length || !!yearReleased">
        <v-btn
          class="danger"
          :block="true"
          :disabled="!(genreSelected.length || !!yearReleased)"
          @click="clearFilter"
        >
          Clear
        </v-btn>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import filmsApi from '@/api/films'
import {mapState} from 'vuex'
import tvshowApi from '@/api/tvshows'

export default {
  name: 'FilterMovies',
  props: {
    typeMovie: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      genreList: null,
      genreSelected: this.$store.state.filterMovies.genreSelected,
      yearReleased: this.$store.state.filterMovies.yearReleased,
    }
  },
  async created() {
    if (this.typeMovie === 'films') {
      this.genreList = await filmsApi.getGenreList()
    } else {
      this.genreList = await tvshowApi.getGenreList()
    }
  },
  computed: {
    ...mapState({
      sortBy: (state) => state.sort.sortBy,
    }),
    isDisableShowBtn() {
      return !(!!this.genreSelected.length || !!this.yearReleased)
    },
    yearList() {
      const years = []

      for (let i = 0; i <= 60; i++) {
        years.push(2021 - i)
      }

      return years
    },
  },
  methods: {
    filter() {
      this.$store.commit('setGenreSelected', this.genreSelected)
      this.$store.commit('setYearReleased', this.yearReleased)

      this.$emit('doFilter', 1)
    },
    clearFilter() {
      this.yearReleased = ''
      this.genreSelected = []

      this.$store.commit('setGenreSelected', this.genreSelected)
      this.$store.commit('setYearReleased', this.yearReleased)

      this.$emit('doFilter', 1)
    },
  },
}
</script>
