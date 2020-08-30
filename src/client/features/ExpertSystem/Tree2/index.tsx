import { 
    createChart,
    DetailedRenderer,
    HourglassChart
 } from 'topola';
import React from 'react'
import {event, select, Selection} from 'd3-selection';

const data = {
  indis: [{
    id: 'I1',
    firstName: 'John',
    lastName: 'Smith',
    famc: 'F1',
  }, {
    id: 'I2',
    firstName: 'Peter',
    lastName: 'Smith',
    fams: ['F1'],
  }, {
    id: 'I3',
    firstName: 'Laura',
    lastName: 'Abbot',
    fams: ['F1'],
  }],
  fams: [{
    id: 'F1',
    husb: 'I2',
    wife: 'I3',
    children: ['I1'],
  }],
};

export const Tree2 = () => {

    setTimeout(() => createChart({
        json: data,
        chartType: HourglassChart,
        renderer: DetailedRenderer,
        indiCallback: (info) => console.log(info),
        svgSelector: '#chart',
    }).render(), 5000)

    return (
          <svg id="chartSvg">
            <g id="chart" />
          </svg>
    )
}