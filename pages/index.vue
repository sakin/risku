<template>
  <div class="justify-center flex w-100 flex-col">
    <div class="bg-white">
      <p>count: {{count}}</p>
      <a @click.prevent="increment" href="#" class="btn btn-primary">+</a>
      </div>
    <div class="map">
      <img src="~assets/images/westeros.jpg" />
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  async mounted() {
    // console.log(this.$fireAuth);
    try {
      await this.$store.dispatch('user/bindCountDocument')
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async increment() {
      await this.$store.dispatch('user/increment', parseInt(this.count) + 1) 
    }
    // login() {
    //   // this.$root.emit("openLoginModal");
    //   console.log(this.$refs["login-modal"]);
    //   this.$refs["login-modal"].open();
    // },
    // closeModal() {
    //   console.log("close modal");
    // }
  },
  computed: {
    count() {
      return this.$store.getters["user/count"];
    }
  }
};
</script>

<style lang="postcss">
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.map {
  @apply .relative;
  width: 1024px;
  height: 1024px;
}

.territory-large {
  @apply .absolute .border-2 .border-solid .border-blue-100 .flex .justify-center .items-center .rounded-full;
  width: 36px;
  height: 36px;
}

.js_territory {
  @apply .text-white .text-sm .font-bold;
}
</style>
