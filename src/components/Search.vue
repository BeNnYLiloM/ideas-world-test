<template>
  <div class="search-wrap">
    <v-btn
      v-if="!mobileSearchShow"
      class="search__mobile-btn"
      icon
      @click.stop="showSearch"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <div class="search" :class="{show: mobileSearchShow}">
      <v-text-field
        v-model="search"
        placeholder="Search..."
        :hide-details="true"
        @keydown="doSearch"
      />
      <div class="search__results" v-if="showResults && search.length">
        <loader v-if="isLoading" />
        <div v-else @click.stop="clearSearch">
          <div
            class="search__results-item"
            v-for="item in filterResults"
            :key="item.id"
          >
            <router-link
              :to="{
                name: toLink(item.media_type),
                params: {id: item.id, type: type(item.media_type)},
              }"
            >
              {{ item.title || item.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchApi from '@/api/search'
import Loader from '@/components/Loader'

export default {
  name: 'Search',
  components: {Loader},
  data() {
    return {
      search: '',
      timeout: null,
      results: null,
      showResults: false,
      isLoading: false,
      mobileSearchShow: false,
    }
  },
  created() {
    document.addEventListener('click', (e) => {
      if (
        !e.target.classList.contains('search') &&
        !e.target.closest('.search-wrap')
      ) {
        this.showResults = false
        this.mobileSearchShow = false
      }
    })
  },
  computed: {
    filterResults() {
      const filteredResults = []

      this.results.results.forEach((el) => {
        if (el.media_type !== 'person') {
          filteredResults.push(el)
        }
      })

      return filteredResults
    },
  },
  methods: {
    doSearch() {
      clearTimeout(this.timeout)

      this.showResults = true
      this.isLoading = true
      this.debounce()
    },
    debounce() {
      this.timeout = setTimeout(() => {
        if (this.search.length) {
          searchApi.search(this.search).then((res) => {
            this.results = res
            this.isLoading = false
          })
        }
      }, 500)
    },
    toLink(mediaType) {
      return mediaType === 'movie' ? 'filmDetail' : 'tvshowDetail'
    },
    type(mediaType) {
      return mediaType === 'movie' ? 'movies' : 'tv'
    },
    clearSearch() {
      this.showResults = false
      this.search = ''
      this.mobileSearchShow = false
    },
    showSearch() {
      this.mobileSearchShow = true
    },
  },
}
</script>

<style lang="scss">
.search {
  position: relative;

  @media (max-width: 992px) {
    position: absolute;
    top: 100%;
    opacity: 0;
    visibility: hidden;
    transition: 0.2s ease-out;
    z-index: 10;
    background: #272727;
    width: 100%;
    left: 0;
    padding: 10px 20px 20px;

    &.show {
      opacity: 1;
      visibility: visible;
    }
  }

  &-wrap {
    width: 100%;
    max-width: 400px;
    margin-right: 20px;

    @media (max-width: 992px) {
      width: auto;
    }
  }

  &__results {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 300px;
    background: #fff;
    overflow-y: auto;
    padding: 6px 0;
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 8px 8px;

    &-item {
      padding: 6px 14px;
    }

    .search__results-item a {
      color: #272727;
    }
  }

  &__mobile-btn.v-btn {
    display: none;

    @media (max-width: 992px) {
      display: block;
    }
  }
}
</style>
