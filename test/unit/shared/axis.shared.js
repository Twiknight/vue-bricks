'use strict'
import Vue from 'vue'
import _ from 'lodash'

function prepare (axis, source) {
  return new Vue({
    template: `<div>
    <axis
      :color = "color"
      :x = "x"
      :y = "y"
      :ticks = "ticks"
      :text-decorator = "textDecorator"
      :axis-length="axisLength"></axis>
    <div>`,
    data: function () {
      return {...source}
    },
    components: {'axis': axis}
  }).$mount()
}

function exec (axis, source, expected) {
  describe('', () => {
    let vm
    beforeEach(function () {
      vm = prepare(axis, source)
    })

    it('location', function () {
      const axis = vm.$el.querySelector('.axis')
      const location = axis.getAttribute('transform')
      expect(location).toBe(expected.location)
    })

    it('domain line', function () {
      const domainLine = vm.$el.querySelector('.domain')
      expect(domainLine.getAttribute('x2')).toEqual(expected.x2)
      expect(domainLine.getAttribute('y2')).toBe(expected.y2)
      expect(domainLine.getAttribute('stroke')).toBe(expected.color)
    })

    it('ticks', function () {
      const ticks = vm.$el.querySelectorAll('.tick')
      expect(ticks.length).toEqual(expected.tickCount)

      const tickLocations = _.map(Array.from(ticks), (el) => el.getAttribute('transform'))
      expect(_.xor(tickLocations, expected.tickLocations)).toEqual([])
    })

    it('tick lines', function () {
      const tickLines = Array.from(vm.$el.querySelectorAll('.tick line'))
      expect(tickLines.length).toBe(expected.tickCount)

      _.forEach(tickLines, function (el) {
        const color = el.getAttribute('stroke')
        expect(color).toEqual(expected.color)

        const x2 = el.getAttribute('x2')
        expect(x2).toEqual(expected.tickX)

        const y2 = el.getAttribute('y2')
        expect(y2).toEqual(expected.tickY)
      })
    })

    it('tick texts', function () {
      const tickTexts = Array.from(vm.$el.querySelectorAll('.tick text'))
      expect(tickTexts.length).toBe(expected.tickCount)

      _.forEach(tickTexts, function (el) {
        const anchor = el.getAttribute('text-anchor')
        expect(anchor).toEqual(expected.textAnchor)

        const x = el.getAttribute('x')
        expect(x).toEqual(expected.textX)

        const dx = el.getAttribute('dx')
        expect(dx).toEqual(expected.textXOffset)

        const y = el.getAttribute('y')
        expect(y).toEqual(expected.textY)

        const dy = el.getAttribute('dy')
        expect(dy).toEqual(expected.textYOffset)
      })

      const texts = _.map(tickTexts, (el) => el.textContent)
      expect(_.xor(texts, expected.texts)).toEqual([])
    })
  })
}

export {
  prepare,
  exec
}
