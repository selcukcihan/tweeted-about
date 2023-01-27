import React from 'react'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Chart } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import { Topic } from '../common/types'

Chart.register(ChartDataLabels)

export default function Infographic(props: { topics: Topic[] }) {
  const labels = []
  const data = []

  for (let i = 0; i < props.topics.length; i++) {
    labels.push((i + 1) + '- ' + props.topics[i].name)
    data.push(props.topics[i].count)
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
              formatter: (val: any) => val + '',
            },
          },
        }}
      />
    </div>
  )
}
