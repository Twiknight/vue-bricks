import {barset} from 'src/index'
import {exec} from '../shared/barset.shared.js'

const bars = barset.vertical_bars

describe('vertical bar set default value', function () {
  const source = {
    max_value: 100,
    bar_width: 10,
    length: 100
  }

  const expected = {
    location: 'translate(0,0)',
    barCount: 0,
    barLocations: [],
    rects: []
  }

  exec(bars, source, expected)
})

describe('horizontal bar set custom values', function () {
  const source = {
    series: [-50, 0, 50],
    x: 10,
    y: 10,
    min_value: -100,
    max_value: 100,
    bar_width: 20,
    length: 200,
    gap: 5,
    colorer: function (v) {
      if (v > 0) {
        return 'green'
      } else {
        return 'red'
      }
    },
    mouseover: jasmine.createSpy('mouseover'),
    mouseout: jasmine.createSpy('mouseout')
  }

  const expected = {
    location: 'translate(10,10)',
    barCount: 3,
    barLocations: ['translate(5,0)', 'translate(25,0)', 'translate(45,0)'],
    rects: [
      {
        width: '20',
        height: '50',
        fill: 'red'
      },
      {
        width: '20',
        height: '100',
        fill: 'red'
      },
      {
        width: '20',
        height: '150',
        fill: 'green'
      }
    ]
  }

  exec(bars, source, expected)
})
