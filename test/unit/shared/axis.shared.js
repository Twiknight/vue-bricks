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

      const colors = _.map(tickLines, (el) => el.getAttribute('stroke'))
      expect(_.every(colors, (x) => x === expected.color)).toBeTruthy()

      const xs = _.map(tickLines, (el) => el.getAttribute('x2'))
      expect(_.every(xs, (x) => x === expected.tickX)).toBeTruthy()

      const ys = _.map(tickLines, (el) => el.getAttribute('y2'))
      expect(_.every(ys, (y) => y === expected.tickY)).toBeTruthy()
    })

    it('tick texts', function () {
      const tickTexts = Array.from(vm.$el.querySelectorAll('.tick text'))
      expect(tickTexts.length).toBe(expected.tickCount)

      const anchors = _.map(tickTexts, (el) => el.getAttribute('text-anchor'))
      expect(_.every(anchors, (x) => x === expected.textAnchor)).toBeTruthy()

      const xs = _.map(tickTexts, (el) => el.getAttribute('x'))
      expect(_.every(xs, (x) => x === expected.textX)).toBeTruthy()

      const dxs = _.map(tickTexts, (el) => el.getAttribute('dx'))
      expect(_.every(dxs, (dx) => dx === expected.textXOffset)).toBeTruthy()

      const ys = _.map(tickTexts, (el) => el.getAttribute('y'))
      expect(_.every(ys, (y) => y === expected.textY)).toBeTruthy()

      const dys = _.map(tickTexts, (el) => el.getAttribute('dy'))
      expect(_.every(dys, (dy) => dy === expected.textYOffset)).toBeTruthy()

      const texts = _.map(tickTexts, (el) => el.textContent)
      expect(_.xor(texts, expected.texts)).toEqual([])
    })
  })
}

export {
  prepare,
  exec
}
