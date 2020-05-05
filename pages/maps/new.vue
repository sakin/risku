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
        <img :src="previewImage" class="preview" />
        <input type="file" accept="image/*" @change=onImageChange>
        <!-- <input type="email" name="email" v-model="email" class="mb-2 p-2 rounded-sm" placeholder="Email" />
        <input type="password" v-model="password" class="mb-2 p-2 rounded-sm" placeholder="Password" /> -->
        <input type="submit" value="Login" class="btn btn-primary" />
      </form>
      <p class="text-center mt-2">
      <nuxt-link to="/login" class="text-white">Sign Up</nuxt-link>
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
      errors: [],
    }
  },
  methods: {
    onImageChange(e) {
      this.mapImage = e.target.files[0];
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    }
  }
}
</script>

<style lang="postcss" scoped>
.preview {
  max-width: 300px;
}
</style>