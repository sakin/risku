<template>
  <div class="h-screen justify-center items-center flex">
    <div class="bg-blue-900 p-5 rounded-sm main-container">
      <form @submit.prevent="onSubmit" class="flex flex-col">
        <h1 class="text-white text-xl mb-2">Add New Map</h1>
        <p v-if="errors.length" class="text-red-300 bg-red-800 p-3 mb-3 rounded-sm">
          <strong>Please correct the following error(s):</strong>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>
         <input type="text" name="name" v-model="name" class="mb-4 p-2 rounded-sm" placeholder="Map Name" />
        <div class="mb-3">
          <img :src="previewImage" class="preview mb-3" />
          <input type="file" accept="image/*" @change=onImageChange>  
        </div>
        <!-- <input type="submit" v-bind:value="Create Map" class="btn btn-primary"  /> -->
        <button type="submit" class="btn btn-primary" :disabled="submitting">{{buttonLabel}}</button>
      </form>
      <p class="text-center mt-2">
        <nuxt-link to="/" class="text-white">Cancel</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      previewImage: null,
      mapImage: null,
      name: "",
      errors: [],
      submitting: false,
    }
  },
  methods: {
    async onSubmit() {
      this.errors = []
      if (!this.mapImage || !this.name) {
        this.errors.push("Please enter a name or upload a map");
      } else {
        try {
          this.submitting = true;
          const map = { name: this.name, image: this.mapImage }
          await this.$store.dispatch('map/createMap', { map }) 
          // console.log('after')

          // todo: somehow show a toast for success!
          this.$router.push({
            path: '/maps'
          })

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
    onImageChange(e) {
      this.mapImage = e.target.files[0];
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
        console.log('on image load', image);
      };
    }
  },
  computed: {
    buttonLabel() {
      return !this.submitting ? "Create Map" : "Creating..."
    }
  }
}
</script>

<style lang="postcss" scoped>
.preview {
  max-width: 300px;
}
</style>