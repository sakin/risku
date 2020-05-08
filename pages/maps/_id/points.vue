<template>
  <div class=" justify-center items-center flex flex-grow">
    <div class="bg-blue-900 p-5 rounded-sm main-container">
      <div class="flex justify-center items-center mb-4">
        <span class="text-white mr-3"># Cols:</span>
        <input
          type="number"
          name="numCols"
          v-model="numCols"
          class=" p-2 rounded-sm mr-5"
          placeholder="Number of Columns"
        />
        
        <span class="text-white mr-3"># Rows:</span>
        <input
          type="number"
          name="numRows"
          v-model="numRows"
          class=" p-2 rounded-sm"
          placeholder="Number of Rows"
        />
        </div>
      <div class="relative">
        <div class="absolute inset-0">
          <div :class="gridClass" :style="gridStyle">
            <div v-for="index in totalPoints" :key="index" class="border-white border-solid border flex flex-col">
              <a href="#" class='text-white hover:bg-blue-500 hover:opacity-50 flex-1 justify-center items-center flex'>1</a>
            </div>
          </div>
        </div>
        <img :src="map.mapUrl" class="" />
      </div>
      
      <p class="text-center mt-2">
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
      numCols: 10,
      numRows: 10,
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
        map,
      }
    } catch (e) {
      console.log("whoooa", e);
    }
  },
  mounted() {
    this.drawLines();
  },
  methods: {
    drawLines() {

    }
    // async onSubmit() {
    //   this.errors = []
    //   if (!this.name) {
    //     this.errors.push("Please enter a name or upload a map");
    //   } else {
    //     try {
    //       this.submitting = true;
    //       const map = { 
    //         name: this.name, imageHeight: this.imageHeight, imageWidth: this.imageWidth, id: this.id , slug: this.slug
    //       }
    //       await this.$store.dispatch('map/updateMap', { map }) 
    //       this.showSuccess = true;
    //       setTimeout(() => {
    //         this.showSuccess = false
    //       }, 1000)

    //     } catch (e) {
    //       this.submitting = false;
    //       console.log('uh oh', e);
    //       this.handleError(e);
    //     }
    //   }
      
    // },
    // handleError(e) {
    //    this.errors.push("Whoops something bad happened!");
    // },
  },
    
  computed: {
    gridClass() {
      return `grid h-full`;
    },
    currentMap() {
      return this.$store.state.map.currentMap;
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.numCols},minmax(0,1fr)) !important`,
      }
    },
    totalPoints() {
      return this.numCols * this.numRows
    }
  },
};
</script>

<style lang="postcss" scoped>
.point-container{ 
  border: 1px solid white;
}
</style>