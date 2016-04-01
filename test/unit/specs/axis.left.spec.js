'use strict'
import {exec} from '../shared/axis.shared.js'
import {axis} from 'src/index'

const leftAxis = axis.leftAxis

describe('left axis default values', function () {
  const source = {axisLength: 100}
  const expected = {
    location: 'translate(0,0)',
    x2: '0',
    y2: '100',
    color: 'black',
    tickCount: 2,
    tickLocations: ['translate(0,0)', 'translate(0,100)'],
    tickY: '0',
    tickX: '-0.5em',
    textAnchor: 'end',
    textY: '0',
    textYOffset: '0.35em',
    textX: '-0.5em',
    textXOffset: '-0.5em',
    texts: ['0', '100']
  }

  exec(leftAxis, source, expected)
})

describe('left axis custom values', function () {
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
    x2: '0',
    y2: '200',
    color: 'red',
    tickCount: 4,
    tickLocations: [
      'translate(0,0)',
      'translate(0,80)',
      'translate(0,140)',
      'translate(0,200)'
    ],
    tickY: '0',
    tickX: '-0.5em',
    textAnchor: 'end',
    textY: '0',
    textYOffset: '0.35em',
    textX: '-0.5em',
    textXOffset: '-0.5em',
    texts: ['-10cm', '20cm', '50cm', '90cm']
  }

  exec(leftAxis, source, expected)
})
