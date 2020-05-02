<template>
  <div class="h-screen justify-center items-center flex">
    <div class="bg-blue-900 p-5 rounded-sm">
      <form @submit.prevent="onSubmit" class="flex flex-col">
        <h1 class="text-white text-xl mb-2">Sign up</h1>
        <p v-if="errors.length" class="text-red-300 bg-red-800 p-3 mb-3 rounded-sm">
          <strong>Please correct the following error(s):</strong>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>
        <input type="email" name="email" v-model="email" class="mb-2 p-2 rounded-sm" placeholder="Email" />
        <input type="password" v-model="password" class="mb-2 p-2 rounded-sm" placeholder="Password" />
        <input type="code" v-model="code" class="mb-2 p-2 rounded-sm" placeholder="Access Code" />
        <input type="submit" value="Sign Up" class="btn btn-primary" />
      </form>
      <p class="text-center mt-2">
      <nuxt-link to="/login" class="text-white">Login</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      code: "",
      errors: [],
    };
  },
  methods: {
    async onSubmit() {
      this.errors = []
      if (!this.email || !this.password) {
        this.errors.push("Fill an email or password");
      } else if (this.code !== "riskubisku") {
        this.errors.push("You didn't say the magic words.")
      } else {
        try {
          await this.$fireAuth.createUserWithEmailAndPassword(
            this.email,
            this.password
          )
          this.$router.push({
            path: '/'
          })
        } catch (e) {
          this.handleError(e)
        }
      }
    },
    handleError(e) {
      this.errors.push(e.message)
    }
  }
};
</script>
