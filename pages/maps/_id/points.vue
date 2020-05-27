<template>
  <div class=" justify-center items-center flex flex-grow">
    <div class="bg-blue-900 p-5 rounded-sm main-container">
      {{originalMapSize.width}} x {{originalMapSize.height}}
      <br/>
      {{mapSize.width}} x {{mapSize.height}}
      <div class="relative">
        <div v-for="point in mapPoints2" :key="point.id" class="border-white border-solid border flex flex-col">
          <a href="#" v-bind:style="{ left: `${point.x}px`, top: `${point.y}px` }" class='point'>
            {{point.id}}: {{point.currrentX}} x {{point.currentY}}
          </a>
        </div>
        <img :src="map.mapUrl" class="" @click="onMapClick" ref="mapImage" />
      </div>
      
      <p class="text-center mt-2">
        <nuxt-link to="/maps" class="text-white">Back to maps</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
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
    onMapClick(e) {
      // debugger;
      const xPosition = e.clientX;
      const yPosition = e.clientY;
      // const xPosition = e.pageX;
      // const yPosition = e.pageY;
      const renderedMap = this.$refs.mapImage.getClientRects();
      const renderedMap2 = this.$refs.mapImage.getBoundingClientRect();
      this.mapSize = { width: renderedMap2.width, height: renderedMap2.height}
      var x = xPosition - renderedMap2.left; //x position within the element.
      var y = yPosition - renderedMap2.top;  //y position within the element.
      
      console.log('small position', x, y, 'original position', this.mapRatio.width * x, this.mapRatio.height * y)
      this.addPoint(x, y);
      // console.log('mouse position', e, xPosition, yPosition, renderedMap[0].height, renderedMap[0].width);
      // console.log('image widths', );
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
    mapPoints2() {
      
      const points = this.map.points.map((point) => {
        return {
          ...point,
          currentX: point.x  /this.mapRatio.width ,
          currentY: point.y / this.mapRatio.height
        }
      });
      console.log('points', points);
      return points;
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.numCols},minmax(0,1fr))`,
        display:"grid", 
        height: "100%",
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
.point {
  @apply absolute text-white flex-1 justify-center items-center flex;
  &:hover {
    @apply bg-blue-500 opacity-50;
  }
}
</style>