<template>
  <div class=" justify-center items-center flex flex-grow">
    <div class="bg-blue-900 p-5 rounded-sm main-container">
      <form @submit.prevent="onSubmit" class="flex flex-col">
        <h1 class="text-white text-xl mb-2">Edit Map</h1>
        <p v-if="errors.length" class="text-red-300 bg-red-800 p-3 mb-3 rounded-sm">
          <strong>Please correct the following error(s):</strong>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>
        <transition name="fade">
          <div key="1" v-if="showSuccess">
            <div class="text-green-800 bg-green-200 p-3 mb-3 rounded-sm">Updated!</div>
          </div>
        </transition>
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
          <img :src="mapUrl" class="preview mb-3 max-w-xs" />
          <!-- <input type="file" accept="image/*" @change="onImageChange" /> -->
        </div>
        <!-- <input type="submit" v-bind:value="Create Map" class="btn btn-primary"  /> -->
        
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          Update Map
        </button>
      </form>
      <p class="text-center mt-2 flex flex-col">
        <nuxt-link v-if="id" :to="'/maps/' + id + '/points'" class="text-white">Edit Points</nuxt-link>
        <nuxt-link to="/maps" class="text-white">Back to maps</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      submitting: false,
      showSuccess: false,
    }
  },
  async asyncData(stuff) {
    const {params, store} = stuff;
    try {
      // if id is not here error
      const map = await store.dispatch(
        "map/getMap",
        params.id
      );

      return {
        id: map.id,
        name: map.name,
        slug: map.slug,
        imageHeight: map.imageHeight,
        imageWidth: map.imageWidth,
        mapUrl: map.mapUrl,
        
      }
    } catch (e) {
      console.log("whoooa", e);
    }
  },
  mounted() {

    this.getImageDimensions()
  },
  methods: {
    async onSubmit() {
      this.errors = []
      if (!this.name) {
        this.errors.push("Please enter a name or upload a map");
      } else {
        try {
          this.submitting = true;
          const map = { 
            name: this.name, imageHeight: this.imageHeight, imageWidth: this.imageWidth, id: this.id , slug: this.slug
          }
          await this.$store.dispatch('map/updateMap', { map }) 
          this.showSuccess = true;
          setTimeout(() => {
            this.showSuccess = false
          }, 1000)

        } catch (e) {
          this.submitting = false;
          console.log('uh oh', e);
          this.handleError(e);
        }
      }
      
    },
    handleError(e) {
       this.errors.push("Whoops something bad happened!");
    },
    getImageDimensions() {
      console.log('image dimensions', this.mapUrl)
      if (this.mapUrl) {
        let img = new Image();

        img.onload = () => {
          console.log(`the image dimensions are ${img.width}x${img.height}`);
          this.imageHeight = img.height;
          this.imageWidth = img.width;
        }
        img.src = this.mapUrl

      }
    }
  },
  computed: {
  },
};
</script>
