import React from 'react'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels'
import { Chart } from 'chart.js/auto'
Chart.register(ChartDataLabels)
import { Pie } from 'react-chartjs-2'
import { Topic } from '../types'

export default function Infographic(props: { user: UserProfile, topics: Topic[] }) {
  const labels = []
  const data = []
  const _labels: any = {}

  // Sort by count descending, take the first 10 entries.
  const input = props.topics.sort((a, b) => b.count - a.count).slice(0, 10)

  // Convert to percentages by normalizing
  const total = input.reduce((acc, cur) => (acc += cur.count), 0)
  input.map(t => t.count = Math.ceil(100 * t.count / total))
  // Make sure it sums up to 100
  input[0].count = 100 - (input.slice(1, input.length).reduce((acc, val) => acc += val.count, 0))

  for (let topic of input) {
    labels.push(topic.name)
    _labels[topic.name] = {
      formatter: (val: any, ctx: Context) => topic.name.substring(0, 20),
    }
    data.push(topic.count)
  }
  return (
    <div className='p-4'>
      <Pie
        data={{
          labels,
          datasets: [{
            data: data,
          }],
        }}
      />
    </div>
  )
}

/*
export default function Infographic(props: { user: UserProfile, topics: { [k: string]: number } }) {
  const labels = []
  const datasets = []
  let i = 0
  for (let [k, val] of Object.entries(props.topics).sort((a, b) => b[1] - a[1])) {
    labels.push('')
    const data = new Array(10)
    data[i] = val
    datasets.push({
      label: k,
      data,
      borderWidth: 1,
    })
    i++
    if (i >= 10) {
      break
    }
  }
  return (
    <div className='p-4'>
      <Bar
        data={{
          labels,
          datasets,
        }}
        options={{
          indexAxis: 'y' as const,
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          plugins: {
            legend: {
              position: 'bottom' as const,
            },
          },
        }}
      />
    </div>
  )
}
*/