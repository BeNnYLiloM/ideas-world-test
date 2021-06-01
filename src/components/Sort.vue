<template>
  <v-sheet rounded="lg" class="mb-8">
    <v-list color="transparent">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-4">Sort</v-list-item-title>
          <v-select
            v-model="sortBy"
            item-text="name"
            item-value="value"
            label="Sort By"
            :items="sortByItems"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
export default {
  name: 'Sort',
  data() {
    return {
      sortByItems: this.$store.state.sort.sortByItems,
      sortBy: this.$store.state.sort.sortBy,
    }
  },
  watch: {
    sortBy() {
      this.$store.commit('setSortBy', this.sortBy)
    },
  },
}
</script>
