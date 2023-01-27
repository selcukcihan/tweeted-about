import { Topic } from './types'

export const normalizeTopics = (topics: Topic[]) => {
  if (topics.length === 0) {
    return topics
  }
  // Sort by count descending, take the first 10 entries.
  const normalized = topics.sort((a, b) => b.count - a.count).slice(0, 10)
  
  // Convert to percentages by normalizing
  const total = normalized.reduce((acc, cur) => (acc += cur.count), 0)
  normalized.map(t => t.count = Math.ceil(100 * t.count / total))
  // Make sure it sums up to 100
  normalized[0].count = 100 - (normalized.slice(1, normalized.length).reduce((acc, val) => acc += val.count, 0))
  
  return normalized
}

export const convertTopics = (topics: any) => Object.entries(topics).map((t: any) => ({ name: t[0] as string, count: t[1] as number }))
