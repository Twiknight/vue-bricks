import {exec} from '../shared/barset.shared.js'
import {barset} from 'src/index'

const bars = barset.horizontal_bars

describe('horizontal barset default values', function () {
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

describe('horizontal bars custom value', function () {
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
    barLocations: ['translate(0,5)', 'translate(0,25)', 'translate(0,45)'],
    rects: [
      {
        width: '50',
        height: '20',
        fill: 'red'
      },
      {
        width: '100',
        height: '20',
        fill: 'red'
      },
      {
        width: '150',
        height: '20',
        fill: 'green'
      }
    ]
  }

  exec(bars, source, expected)
})
