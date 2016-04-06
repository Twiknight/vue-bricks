'use strict'
import Vue from 'vue'
import template from './template.vue'

const preprocessBars = function (data, length, max, min) {
  const unit = length / (max - min)
  return data.map(function (value) {
    return {
      translated: (value - min) * unit,
      origin: value
    }
  })
}

const baseOptions = {
  template: template.template,
  props: {
    series: {
      type: Array,
      default: () => [],
      validator: function (value) {
        if (!Array.isArray(value)) {
          return false
        }

        value.forEach(function (x) {
          if (typeof x !== 'number') {
            return false
          }

          if (x === Infinity || x === -Infinity) {
            return false
          }
        })

        return true
      }
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    min_value: {
      type: Number,
      default: 0
    },
    max_value: {
      type: Number,
      required: true
    },
    bar_width: {
      type: Number,
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    gap: {
      type: Number,
      default: 1
    },
    colorer: {
      type: Function,
      default: (v) => ''
    }
  },
  computed: {
    location () {
      return `translate(${this.x},${this.y})`
    }
  },
  methods: {
    mouseover (data) {
      const wrapper = {
        el: this.$el,
        data: data
      }
      this.$dispatch('mouseover_bar', wrapper)
    },
    mouseout (data) {
      const wrapper = {
        el: this.$el,
        data: data
      }
      this.$dispatch('mouseout_bar', wrapper)
    }
  }
}

const horizontalMixin = {
  computed: {
    bars () {
      const barSet = preprocessBars(this.series, this.length, this.max_value, this.min_value)
      const height = this.bar_width
      const gap = this.gap
      const colorer = this.colorer
      return barSet.map((x, idx) => {
        return {
          location: `translate(${0},${idx * height + gap})`,
          width: x.translated,
          height: height,
          color: colorer(x.origin),
          data: x.origin
        }
      })
    }
  }
}

const horizontal_bars = Vue.extend({
  mixins: [baseOptions, horizontalMixin]
})

export default {
  horizontal_bars
}
