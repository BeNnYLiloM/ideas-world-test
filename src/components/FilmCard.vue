<template>
  <v-card>
    <v-img height="350" :src="imageSrc" />
    <v-card-title>
      <router-link :to="{name: routeFromType, params: {id: data.id, type}}">
        {{ data.title || data.name }}
      </router-link>
    </v-card-title>
    <v-card-text>
      <v-row class="mx-0" align="center">
        <v-rating
          :value="data.vote_average"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
          length="10"
        />
        <div class="grey--text ms-4">
          {{ data.vote_average }}
          ({{ data.vote_count }})
        </div>
      </v-row>
      <div class="mt-6">{{ data.release_date }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import {IMAGE_W400_URL} from '@/utils/constants'

export default {
  name: 'FilmCard',
  props: {
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imageUrl: IMAGE_W400_URL,
    }
  },
  computed: {
    imageSrc() {
      return this.data.poster_path
        ? `${this.imageUrl}${this.data.poster_path}`
        : require('@/assets/movie-placeholder.png')
    },
    routeFromType() {
      return this.type === 'movie' ? 'filmDetail' : 'tvshowDetail'
    },
  },
}
</script>
