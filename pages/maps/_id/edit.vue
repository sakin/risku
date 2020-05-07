<template>
  <div class=" justify-center items-center flex flex-grow">
    <div class="bg-blue-900 p-5 rounded-sm main-container">
      <form @submit.prevent="onSubmit" class="flex flex-col">
        <h1 class="text-white text-xl mb-2">Edit Map</h1>
        <!-- <p v-if="errors.length" class="text-red-300 bg-red-800 p-3 mb-3 rounded-sm">
          <strong>Please correct the following error(s):</strong>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p> -->
        <input
          type="text"
          name="name"
          v-model="name"
          class="mb-4 p-2 rounded-sm"
          placeholder="Map Name"
        />
        <input
          type="text"
          name="name"
          v-model="imageHeight"
          class="mb-4 p-2 rounded-sm"
          placeholder="Image Height"
        />
        <input
          type="text"
          name="name"
          v-model="imageWidth"
          class="mb-4 p-2 rounded-sm"
          placeholder="Image Width"
        />
        <div class="mb-3">
          <img :src="previewImage" class="preview mb-3 max-w-xs" />
          <input type="file" accept="image/*" @change="onImageChange" />
        </div>
        <!-- <input type="submit" v-bind:value="Create Map" class="btn btn-primary"  /> -->
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          Save Map
        </button>
      </form>
      <p class="text-center mt-2">
        <nuxt-link to="/" class="text-white">Cancel</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      imageHeight: null,
      imageWidth: null,
      previewImage: null
    };
  },
  async fetch() {
    try {
      // if id is not here error
      const map = await this.$store.dispatch(
        "map/getMap",
        this.$route.params.id
      );
      this.name = map.name;
      this.imageHeight = map.imageHeight;
      this.imageWidth = map.imageWidth;
      this.previewImage = map.mapUrl;
    } catch (e) {
      console.log("whoooa", e);
    }
  },
  // async mounted() {
  //   if (!this.imageHeight || !this.imageWidth) {

  //   }
  // },
  computed: {
    currentMap() {
      return this.$store.state.map.currentMap;
    }
  }
};
</script>
