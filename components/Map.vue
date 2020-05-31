<template>
  <div class="relative">
    <a  v-for="point in mapPoints2" :key="point.id" href="#" v-bind:style="{ left: `${point.x}px`, top: `${point.y}px` }" class='point'>
    </a>
    <img :src="map.mapUrl" class="" @click="emitMapClick" ref="mapImage" />
  </div>
</template>

<script>
export default {
  props: {
    map: Object
  },
  data() {
    return {
      mapSize: {
        height: null,
        width: null,
      }
    }
  },
  mounted() {
    this.calculateImage()
    // this.drawLines();
  },
  methods: {
    emitMapClick(e) {
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
      
      console.log('small position', x, y, 'original position', this.mapRatio.width * x, this.mapRatio.height * y);
      this.$emit('map-clicked', [x, y])
      // this.addPoint(x, y);
      // console.log('mouse position', e, xPosition, yPosition, renderedMap[0].height, renderedMap[0].width);
      // console.log('image widths', );
    },
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
  },
  computed: {
    mapRatio() {
      return {
        width: this.map.imageWidth / this.mapSize.width, 
        height: this.map.imageHeight / this.mapSize.height
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
  },
}
</script>

<style lang="postcss" scoped>
.point-container{ 
  border: 1px solid white;
}
.point {
  transform: translate(-50%, -50%);
  @apply absolute text-white flex-1 justify-center items-center flex h-8 w-8 bg-blue-800 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white border-solid;
  &:hover {
    @apply bg-blue-500 opacity-50;
  }
}
</style>