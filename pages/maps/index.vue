<template>
  <div class="h-screen justify-center items-center flex">
    <div class="bg-blue-900 p-5 rounded-sm main-container">
      <nuxt-link to="/maps/new" class="btn btn-primary">Create new map</nuxt-link>
      <ul class="mt-5">
        <li v-for="map in maps" :key="map.id" class="flex items-center mb-3">
          <img :src=map.mapUrl :alt=map.name class="w-64 mr-3" />
          <span class="text-white">{{ map.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    try {
      await this.$store.dispatch('map/getAllMaps') 
    } catch(e) {
      console.log('whoooa', e)
    }
  },
  computed: {
    maps() {
      console.log('hi im the view', this.$store.state.map.maps)
      return  this.$store.state.map.maps;
    }
  }
}
</script>