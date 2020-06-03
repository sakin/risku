<template>
  <a href="#" v-bind:style="{ left: `${point.x}px`, top: `${point.y}px` }" class='point'>
    {{point.id}}: {{point.currrentX}} x {{point.currentY}}
  </a>
</template>