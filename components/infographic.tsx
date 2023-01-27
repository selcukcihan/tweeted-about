import React from 'react'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Chart } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import { Topic } from '../types'

Chart.register(ChartDataLabels)

export default function Infographic(props: { topics: Topic[] }) {
  const labels = []
  const data = []

  // Sort by count descending, take the first 10 entries.
  const input = props.topics.sort((a, b) => b.count - a.count).slice(0, 10)

  // Convert to percentages by normalizing
  const total = input.reduce((acc, cur) => (acc += cur.count), 0)
  input.map(t => t.count = Math.ceil(100 * t.count / total))
  // Make sure it sums up to 100
  input[0].count = 100 - (input.slice(1, input.length).reduce((acc, val) => acc += val.count, 0))

  for (let i = 0; i < input.length; i++) {
    labels.push((i + 1) + '- ' + input[i].name)
    data.push(input[i].count)
  }
  return (
    <div className='p-4 text-white'>
      <Pie
        data={{
          labels,
          datasets: [{
            data: data,
          }],
        }}
        options={{
          plugins: {
            legend: {
              onClick: function() {},
            },
            datalabels: {
              color: 'black',
              formatter: (val: any) => val + '%',
            },
          },
        }}
      />
    </div>
  )
}
