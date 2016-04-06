'use strict'
import Vue from 'vue'
import _ from 'lodash'

Vue.config.debug = true
function prepare (barset, source) {
  return new Vue({
    template: `<div>
    <barset
      :series = 'series'
      :x = 'x'
      :y = 'y'
      :min_value = 'min_value'
      :max_value = 'max_value'
      :bar_width = 'bar_width'
      :length = 'length'
      :gap = 'gap'
      :colorer = 'colorer'>
    </barset>
    </div>`,
    data: function () {
      return {...source}
    },
    components: {
      barset: barset
    },
    events: {
      mouseover_bar: source.mouseover,
      mouseout_bar: source.mouseout
    }
  }).$mount()
}

function exec (barset, source, expected) {
  describe('', () => {
    let vm
    beforeEach(function () {
      vm = prepare(barset, source)
    })

    it('location', function () {
      const location = vm.$el.querySelector('.bar-set').getAttribute('transform')
      expect(location).toEqual(expected.location)
    })

    it('bars', function () {
      const bars = vm.$el.querySelectorAll('.bar')
      expect(bars.length).toEqual(expected.barCount)

      const barLocations = _.map(Array.from(bars), (el) => el.getAttribute('transform'))
      expect(_.xor(barLocations, expected.barLocations)).toEqual([])
    })

    it('bar rects', function () {
      const rects = _.map(Array.from(vm.$el.querySelectorAll('.bar rect')), function (el) {
        return {
          width: el.getAttribute('width'),
          height: el.getAttribute('height'),
          fill: el.getAttribute('fill')
        }
      })

      expect(_.xorWith(rects, expected.rects, _.isEqual)).toEqual([])
    })

    it('events', function () {
      const rects = Array.from(vm.$el.querySelectorAll('.bar rect'))

      if (rects.length > 0) {
        spyOn(source, 'mouseover')
        spyOn(source, 'mouseout')
        const ev_in = new Event('mouseover')
        const ev_out = new Event('mouseout')

        rects[0].dispatchEvent(ev_in)
        Vue.nextTick(function () {
          expect(source.mouseover).toHaveBeenCalled()
        })

        rects[0].dispatchEvent(ev_out)
        Vue.nextTick(function () {
          expect(source.mouseout).toHaveBeenCalled()
        })
      }
    })
  })
}

export {prepare, exec}
