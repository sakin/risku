<template>
  <div>
    <div class="bg-blue-900 flex w-full py-3">
      <h1 class="text-white pl-3">Risku</h1>
      <ul class="self-end flex ml-auto pr-3" v-if="loggedIn">
        <li class="ml-6 text-gray-400" v-if="loggedIn">
          {{ email }}
        </li>
        <li v-if="loggedIn" class="self-end ml-6">
          <nuxt-link class="text-gray-400" to="/maps/new">Create New Map</nuxt-link>
        </li>
        <li v-if="loggedIn" class="self-end ml-6">
          <a class="text-gray-400 cursor-pointer" @click.prevent="logout"
            >Logout</a
          >
        </li>
        
      </ul>
      <ul v-else>
        <li class="ml-6">
          <nuxt-link class="text-gray-400" to="/login">Login</nuxt-link>
        </li>
      </ul>
    </div>
    <nuxt />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      mounted: false
    };
  },
  mounted() {
    this.mounted = true;
  },
  methods: {
    ...mapActions({
      logout: "user/logout" // map `this.add()` to `this.$store.dispatch('increment')`
    })
  },
  computed: {
    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },
    ...mapState({
      email(state) {
        return state.user.email;
      }
    })
  }
};
</script>

<style lang="postcss">
body {
  @apply .bg-black;
  background-color: #000000;
}
</style>
