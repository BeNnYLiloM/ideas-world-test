<template>
  <div class="sidebar">
    <sort />

    <filter-movies :typeMovie="typeMovie" @doFilter="doFilter" />
  </div>
</template>

<script>
import Sort from '@/components/Sort'
import FilterMovies from '@/components/FilterMovies'

export default {
  name: 'Sidebar',
  props: {
    typeMovie: {
      type: String,
      required: true,
    },
  },
  components: {Sort, FilterMovies},
  methods: {
    doFilter(page) {
      this.$emit('doFilter', page)
    },
  },
}
</script>
