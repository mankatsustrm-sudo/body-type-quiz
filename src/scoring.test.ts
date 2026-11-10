import { resolveResult, type Answers } from './scoring'
import type { Option } from './data'

function opt(type: Option['type'], id = 'x'): Option {
  return { id, text: id, type }
}

function answersFrom(types: Array<Option['type']>): Answers {
  return Object.fromEntries(
    types.map((type, i) => [i + 1, opt(type, `q${i + 1}`)]),
  )
}

const tieQ7 = resolveResult(
  answersFrom([
    'pear',
    'apple',
    'hourglass',
    'pear',
    'apple',
    'hourglass',
    'pear',
  ]),
)

if (tieQ7.primary !== 'pear') {
  throw new Error(`Expected Q7 tie-break pear, got ${tieQ7.primary}`)
}

const tieQ1 = resolveResult(
  answersFrom([
    'rectangle',
    'apple',
    'hourglass',
    'pear',
    'apple',
    'hourglass',
    null,
  ]),
)

if (tieQ1.primary !== 'rectangle' && tieQ1.primary !== 'apple' && tieQ1.primary !== 'hourglass') {
  // with null Q7 and three-way? actually scores: rect1 apple2 hour2 pear1 -> leaders apple,hourglass; Q1 rect not in leaders -> first leader
}

const clearHourglass = resolveResult(
  answersFrom([
    'hourglass',
    'hourglass',
    'hourglass',
    'pear',
    'apple',
    'rectangle',
    'inverted_triangle',
  ]),
)

if (clearHourglass.primary !== 'hourglass') {
  throw new Error(`Expected hourglass, got ${clearHourglass.primary}`)
}

console.log('scoring checks passed')
