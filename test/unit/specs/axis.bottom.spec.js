'use strict'
import {exec} from '../shared/axis.shared.js'
import {axis} from 'src/index'

const bottomAxis = axis.bottomAxis

describe('bottom axis default values', function () {
  const source = {axisLength: 100}
  const expected = {
    location: 'translate(0,0)',
    x2: '100',
    y2: '0',
    color: 'black',
    tickCount: 2,
    tickLocations: ['translate(0,0)', 'translate(100,0)'],
    tickX: '0',
    tickY: '0.5em',
    textAnchor: 'middle',
    textX: '0',
    textXOffset: '0',
    textY: '0.5em',
    textYOffset: '0.5em',
    texts: ['0', '100']
  }

  exec(bottomAxis, source, expected)
})

describe('bottom axis custom values', function () {
  const source = {
    color: 'red',
    axisLength: 200,
    x: 30,
    y: 30,
    ticks: [-10, 20, 50, 90],
    tickLength: '1em',
    textOffset: '1em',
    textDecorator: (x) => x + 'cm'
  }
  const expected = {
    location: 'translate(30,30)',
    x2: '200',
    y2: '0',
    color: 'red',
    tickCount: 4,
    tickLocations: [
      'translate(0,0)',
      'translate(60,0)',
      'translate(120,0)',
      'translate(200,0)'
    ],
    tickX: '0',
    tickY: '0.5em',
    textAnchor: 'middle',
    textX: '0',
    textXOffset: '0',
    textY: '0.5em',
    textYOffset: '0.5em',
    texts: ['-10cm', '20cm', '50cm', '90cm']
  }

  exec(bottomAxis, source, expected)
})
