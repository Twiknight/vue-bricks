<template >
  <g class="axis" :transform="location">
    <line class="domain" :stroke="color" :x2="x2" :y2="y2"></line>
    <g class="tick" v-for="tick in localTicks" :transform="tick.location">
      <line :x2="tickX" :y2="tickY" :stroke="color"></line>
      <text :text-anchor="textAnchor" :x="textX" :y="textY" :dx="textXOffset" :dy="textYOffset">{{tick.value}}</text>
    </g>
  </g>
</template>
