<template>
  <g class = 'bar-set' :transform = 'location'>
    <g class = 'bar' v-for = 'bar in bars' :transform = 'bar.location'>
      <rect
        :width = 'bar.width'
        :height ='bar.height'
        :fill = 'bar.color'
        v-on:mouseover.stop = 'mouseover(bar.data)'
        v-on:mouseout.stop = 'mouseout(bar.data)'></rect>
    </g>
  </g>
</template>
