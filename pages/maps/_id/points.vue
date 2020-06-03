<template>
  <div class=" justify-center items-center flex flex-grow">
    <div class="bg-blue-900 p-5 rounded-sm main-container">
      {{originalMapSize.width}} x {{originalMapSize.height}}
      <br/>
      {{mapSize.width}} x {{mapSize.height}}

      <!-- <div class="relative">
        <a  v-for="point in mapPoints2" :key="point.id" href="#" v-bind:style="{ left: `${point.x}px`, top: `${point.y}px` }" class='point'>
          
        </a>
        <img :src="map.mapUrl" class="" @click="onMapClick" ref="mapImage" />
      </div> -->
      <Map v-bind:map="map" @map-clicked="onMapClick" />
      <p class="text-center mt-2">
        <nuxt-link to="/maps" class="text-white">Back to maps</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import Map from "~/components/Map.vue";
export default {
  components: {
    Map
  },
  data(things) {
    console.log(things)
    const {map} = things;
    return {
      ...map,
      errors: [],
      mapPoints: [],
      originalMapSize: {
        height: null,
        width: null,
      },
      mapSize: {
        height: null,
        width: null,
      }
      // numCols: 10,
      // numRows: 10,
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
        map: {
          points: [],
          ...map,
        }
      }
    } catch (e) {
      console.log("whoooa", e);
    }
  },
  mounted() {
    this.calculateImage()
    // this.drawLines();
  },
  methods: {
    calculateImage() {
      let img = new Image();
      const vm = this;
      img.onload = function() {
        console.log(this);
        vm.originalMapSize = {height: this.naturalHeight, width: this.naturalWidth}
        vm.mapSize = { width: this.width, image: this.height }  //size is a vue variable
        console.log(vm.mapSize);
      }
      img.src = this.map.mapUrl;
    },
    onMapClick([x, y]) {
      this.addPoint(x, y);
    },
    addPoint(x, y) {
      const originalXPosition = this.mapRatio.width * x;
      const originalYPosition = this.mapRatio.height * y;
      const uuid = this.$uuid();
      this.map.points.push({id: uuid, x, y})
    },
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
    mapRatio() {
      return {
        width: this.originalMapSize.width / this.mapSize.width, 
        height: this.originalMapSize.height / this.mapSize.height
      }
    },
    currentMap() {
      return this.$store.state.map.currentMap;
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