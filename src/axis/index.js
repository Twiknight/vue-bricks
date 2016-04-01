'use strict'
import Vue from 'vue'
import template from './template.vue'

const preprocessTicks = function (ticks, length) {
  const max = Math.max.apply(Math, ticks)
  const min = Math.min.apply(Math, ticks)
  const unit = length / (max - min)

  return ticks.map(function (v) {
    return {
      translatedTick: unit * (v - min),
      originalTick: v
    }
  })
}

const baseOptions = {
  template: template.template,
  props: {
    color: {
      type: String,
      default: 'black'
    },
    axisLength: {
      type: Number,
      default: 0,
      validator: (v) => typeof v === 'number' && v > 0
    },
    x: {
      default: 0
    },
    y: {
      default: 0
    },
    ticks: {
      type: Array,
      default: () => [0, 100],
      validator (value) {
        if (value.length < 2) {
          return false
        }
        if (value.some((x) => typeof x !== 'number' || x === Infinity || x === -Infinity)) {
          return false
        }
        const set = new Set(value)
        if (set.size < value.length) {
          return false
        }
        return true
      }
    },
    tickLength: {
      default: '0.5em',
      coerce () {
        return '0.5em'
      }
    },
    textOffset: {
      default: '0.5em',
      coerce () {
        return '0.5em'
      }
    },
    textDecorator: {
      type: Function,
      default: (x) => x
    }
  },
  computed: {
    location () {
      return `translate(${this.x},${this.y})`
    }
  }
}

const horizontalMixin = {
  computed: {
    localTicks () {
      return preprocessTicks(this.ticks, this.axisLength).map((v) => {
        return {
          location: `translate(${v.translatedTick},0)`,
          value: this.textDecorator(v.originalTick)
        }
      })
    },
    x2 () {
      return this.axisLength
    },
    y2 () {
      return '0'
    },
    tickX () {
      return '0'
    },
    textAnchor () {
      return 'middle'
    },
    textX () {
      return '0'
    },
    textXOffset () {
      return '0'
    }
  }
}

const verticalMixin = {
  computed: {
    localTicks () {
      return preprocessTicks(this.ticks, this.axisLength).map((v) => {
        return {
          location: `translate(0,${this.axisLength - v.translatedTick})`,
          value: this.textDecorator(v.originalTick)
        }
      })
    },
    x2 () {
      return '0'
    },
    y2 () {
      return this.axisLength
    },
    tickY () {
      return '0'
    },
    textY () {
      return '0'
    },
    textYOffset () {
      return '0.35em'
    }
  }
}

const topMixin = {
  computed: {
    tickY () {
      return '-' + this.tickLength
    },
    textY () {
      return '-' + this.tickLength
    },
    textYOffset () {
      return '-' + this.textOffset
    }
  }
}

const bottomMixin = {
  computed: {
    tickY () {
      return this.tickLength
    },
    textY () {
      return this.tickLength
    },
    textYOffset () {
      return this.textOffset
    }
  }
}

const leftMixin = {
  computed: {
    tickX () {
      return '-' + this.tickLength
    },
    textX () {
      return '-' + this.tickLength
    },
    textXOffset () {
      return '-' + this.textOffset
    },
    textAnchor () {
      return 'end'
    }
  }
}

const rightMixin = {
  computed: {}
}

const topAxis = Vue.extend({
  mixins: [baseOptions, horizontalMixin, topMixin]
})

const bottomAxis = Vue.extend({
  mixins: [baseOptions, horizontalMixin, bottomMixin]
})

const leftAxis = Vue.extend({
  mixins: [baseOptions, verticalMixin, leftMixin]
})

const rightAxis = Vue.extend({
  mixins: [baseOptions, verticalMixin, rightMixin]
})

export default {
  topAxis,
  bottomAxis,
  leftAxis,
  rightAxis
}
