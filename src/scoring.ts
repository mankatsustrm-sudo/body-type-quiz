import {
  BODY_TYPES,
  BODY_TYPE_INFO,
  type BodyType,
  type Option,
} from './data'

export type Answers = Record<number, Option>

export type ScoreMap = Record<BodyType, number>

export interface QuizResult {
  primary: BodyType
  secondary: BodyType | null
  scores: ScoreMap
  percentages: Record<BodyType, number>
  tied: boolean
}

export function emptyScores(): ScoreMap {
  return {
    pear: 0,
    apple: 0,
    hourglass: 0,
    rectangle: 0,
    inverted_triangle: 0,
  }
}

export function calculateScores(answers: Answers): ScoreMap {
  const scores = emptyScores()
  for (const option of Object.values(answers)) {
    if (option.type) scores[option.type] += 1
  }
  return scores
}

export function resolveResult(answers: Answers): QuizResult {
  const scores = calculateScores(answers)
  const max = Math.max(...BODY_TYPES.map((t) => scores[t]))
  const leaders = BODY_TYPES.filter((t) => scores[t] === max)
  const tied = leaders.length > 1

  let primary = leaders[0]
  let secondary: BodyType | null = null

  if (tied) {
    const q7 = answers[7]?.type ?? null
    const q1 = answers[1]?.type ?? null

    if (q7 && leaders.includes(q7)) {
      primary = q7
      secondary = leaders.find((t) => t !== primary) ?? null
    } else if (q1 && leaders.includes(q1)) {
      primary = q1
      secondary = leaders.find((t) => t !== primary) ?? null
    } else {
      primary = leaders[0]
      secondary = leaders[1] ?? null
    }
  }

  const total = BODY_TYPES.reduce((sum, t) => sum + scores[t], 0) || 1
  const percentages = BODY_TYPES.reduce(
    (acc, t) => {
      acc[t] = Math.round((scores[t] / total) * 100)
      return acc
    },
    {} as Record<BodyType, number>,
  )

  return { primary, secondary, scores, percentages, tied }
}

export function resultTitle(type: BodyType): string {
  return BODY_TYPE_INFO[type].title
}

export function resultSummary(type: BodyType): string {
  return BODY_TYPE_INFO[type].summary
}
