<template>
  <div class="h-screen justify-center items-center flex">
    <div class="bg-blue-900 p-5 rounded-sm main-container">
      <ul class="mt-5">
        <li v-for="map in maps" :key="map.id" class="flex items-center mb-3">
          <!--- img :src="map.mapUrl" :alt="map.name" class="w-64 mr-3" / --->
          <div class="flex flex-col items-start w-full">
            <span class="text-white text-xl">id: {{ map.id }}</span>
            <span class="text-white text-xl">name: {{ map.name }}</span>
            <!---
            <span class="text-white text-xl">imageHeight: {{ map.imageHeight }}</span>
            <span class="text-white text-xl">imageWidth: {{ map.imageWidth }}</span>
            <span class="text-white text-xl">mapURL: {{ map.mapURL}}</span>            
            <span class="text-white text-xl">name: {{ map.name }}</span>
            <span class="text-white text-xl">slug: {{ map.slug }}</span>
            <span class="text-white text-xl">totalPoints: {{ map.totalPoints }}</span>
            --->
          </div>
        </li>
      </ul>
      <br>
      <div class="text-white text-xl">
        Welcome to Firebase <br>
        <button onclick="map.js/firebaseTest()">
          Firebase Test
        </button>
      </div>
      <br>
      <pre>{{JSON.stringify(maps)}}</pre>
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
      console.log(this.$store.state.map.maps);
      return this.$store.state.map.maps;
    }
  },
};
</script>
