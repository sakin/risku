<template>
  <div class="h-screen justify-center items-center flex">
    <div class="bg-blue-900 p-5 rounded-sm main-container">
      <nuxt-link to="/maps/new" class="btn btn-primary"
        >Create new map</nuxt-link
      >
      <ul class="mt-5">
        <li v-for="map in maps" :key="map.id" class="flex items-center mb-3">
          <img :src="map.mapUrl" :alt="map.name" class="w-64 mr-3" />
          <div class="flex flex-col items-start w-full">
            <span class="text-white text-xl">{{ map.name }}</span>
            <nuxt-link
              :to="'/maps/' + map.id + '/edit'"
              class="btn btn-primary btn-small"
              >Edit</nuxt-link
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    try {
      await this.$store.dispatch("map/getAllMaps");
    } catch (e) {
      console.log("whoooa", e);
    }
  },
  computed: {
    maps() {
      return this.$store.state.map.maps;
    }
  }
};
</script>
