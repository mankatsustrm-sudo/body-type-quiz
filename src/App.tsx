import { useMemo, useState } from 'react'
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react'
import {
  BODY_TYPES,
  BODY_TYPE_INFO,
  QUIZ_QUESTIONS,
  type Option,
} from './data'
import {
  resolveResult,
  resultSummary,
  resultTitle,
  type Answers,
} from './scoring'

type Screen = 'welcome' | 'question' | 'result'

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [animKey, setAnimKey] = useState(0)

  const question = QUIZ_QUESTIONS[stepIndex]
  const progress = ((stepIndex + 1) / QUIZ_QUESTIONS.length) * 100
  const result = useMemo(
    () => (screen === 'result' ? resolveResult(answers) : null),
    [screen, answers],
  )

  function bumpAnim() {
    setAnimKey((k) => k + 1)
  }

  function startQuiz() {
    setAnswers({})
    setStepIndex(0)
    setScreen('question')
    bumpAnim()
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')
  }

  function selectOption(option: Option) {
    const nextAnswers = { ...answers, [question.id]: option }
    setAnswers(nextAnswers)
    window.Telegram?.WebApp?.HapticFeedback?.selectionChanged()

    if (stepIndex >= QUIZ_QUESTIONS.length - 1) {
      setScreen('result')
      bumpAnim()
      return
    }

    setStepIndex((i) => i + 1)
    bumpAnim()
  }

  function goBack() {
    if (stepIndex === 0) return
    setStepIndex((i) => i - 1)
    bumpAnim()
  }

  function restart() {
    setAnswers({})
    setStepIndex(0)
    setScreen('welcome')
    bumpAnim()
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 py-6 sm:py-10">
      <div
        key={`${screen}-${animKey}`}
        className="animate-panel flex flex-1 flex-col"
      >
        {screen === 'welcome' && <WelcomeScreen onStart={startQuiz} />}
        {screen === 'question' && question && (
          <QuestionScreen
            questionText={question.question}
            options={question.options}
            selectedId={answers[question.id]?.id}
            step={stepIndex + 1}
            total={QUIZ_QUESTIONS.length}
            progress={progress}
            canGoBack={stepIndex > 0}
            onBack={goBack}
            onSelect={selectOption}
          />
        )}
        {screen === 'result' && result && (
          <ResultScreen result={result} onRestart={restart} />
        )}
      </div>
    </div>
  )
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="flex flex-1 flex-col justify-center gap-6 rounded-3xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-[0_18px_50px_rgba(26,20,16,0.08)]">
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f3e4db] px-3 py-1 text-sm text-[var(--color-accent-dark)]">
        <Sparkles size={16} />
        7 вопросов · ~2 минуты
      </div>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight">
          Определи свой тип фигуры
        </h1>
        <p className="text-base leading-relaxed text-[var(--color-muted)]">
          Короткий тест поможет понять силуэт и даст ориентир, какие пропорции
          у тебя доминируют: песочные часы, груша, яблоко, прямоугольник или
          перевёрнутый треугольник.
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="mt-2 min-h-12 w-full rounded-2xl bg-[var(--color-accent)] px-5 py-3 text-base font-semibold text-white transition hover:bg-[var(--color-accent-dark)] active:scale-[0.99]"
      >
        Начать тест
      </button>
    </section>
  )
}

function QuestionScreen({
  questionText,
  options,
  selectedId,
  step,
  total,
  progress,
  canGoBack,
  onBack,
  onSelect,
}: {
  questionText: string
  options: Option[]
  selectedId?: string
  step: number
  total: number
  progress: number
  canGoBack: boolean
  onBack: () => void
  onSelect: (option: Option) => void
}) {
  return (
    <section className="flex flex-1 flex-col gap-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-medium text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft size={18} />
            Назад
          </button>
          <span className="text-sm font-medium text-[var(--color-muted)]">
            Вопрос {step} из {total}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#eadfd6]">
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-[0_14px_40px_rgba(26,20,16,0.06)]">
        <h2 className="text-xl font-semibold leading-snug">{questionText}</h2>
      </div>

      <div className="flex flex-col gap-3 pb-2">
        {options.map((option) => {
          const selected = selectedId === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option)}
              className={`min-h-14 rounded-2xl border px-4 py-3.5 text-left text-[15px] leading-snug transition active:scale-[0.99] ${
                selected
                  ? 'border-[var(--color-accent)] bg-[#f8e8e1] text-[var(--color-ink)] shadow-[inset_0_0_0_1px_var(--color-accent)]'
                  : 'border-[var(--color-line)] bg-white/80 hover:border-[#d8c4b6]'
              }`}
            >
              {option.text}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function ResultScreen({
  result,
  onRestart,
}: {
  result: NonNullable<ReturnType<typeof resolveResult>>
  onRestart: () => void
}) {
  const sorted = [...BODY_TYPES].sort(
    (a, b) => result.percentages[b] - result.percentages[a],
  )

  return (
    <section className="flex flex-1 flex-col gap-5">
      <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-[0_18px_50px_rgba(26,20,16,0.08)]">
        <p className="text-sm font-medium uppercase tracking-[0.08em] text-[var(--color-muted)]">
          Твой тип фигуры
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight">
          {resultTitle(result.primary)}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
          {resultSummary(result.primary)}
        </p>
        {result.tied && result.secondary && (
          <p className="mt-4 rounded-2xl bg-[#f3e4db] px-4 py-3 text-sm leading-relaxed text-[var(--color-accent-dark)]">
            Также близко: <strong>{resultTitle(result.secondary)}</strong> —
            {` ${resultSummary(result.secondary)}`}
          </p>
        )}
      </div>

      <div className="rounded-3xl border border-[var(--color-line)] bg-white/70 p-5">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.06em] text-[var(--color-muted)]">
          Разбивка по типам
        </h3>
        <div className="space-y-3">
          {sorted.map((type) => (
            <div key={type} className="space-y-1.5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium">{BODY_TYPE_INFO[type].title}</span>
                <span className="text-[var(--color-muted)]">
                  {result.scores[type]} · {result.percentages[type]}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#eadfd6]">
                <div
                  className="h-full rounded-full bg-[var(--color-ok)] transition-all duration-500"
                  style={{ width: `${result.percentages[type]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] px-5 py-3 text-base font-semibold transition hover:bg-white active:scale-[0.99]"
      >
        <RotateCcw size={18} />
        Пройти заново
      </button>
    </section>
  )
}
