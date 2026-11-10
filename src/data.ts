export type BodyType =
  | 'pear'
  | 'apple'
  | 'hourglass'
  | 'rectangle'
  | 'inverted_triangle'

export interface Option {
  id: string
  text: string
  type: BodyType | null
}

export interface Question {
  id: number
  question: string
  options: Option[]
}

export const BODY_TYPE_INFO: Record<
  BodyType,
  { title: string; summary: string }
> = {
  hourglass: {
    title: 'Песочные часы',
    summary:
      'Гармоничные пропорции: ширина плеч и бедер примерно равна, а талия ярко выражена.',
  },
  pear: {
    title: 'Груша (Треугольник)',
    summary:
      'Женственный силуэт с акцентом на бедрах, изящными плечами и выраженной талией.',
  },
  apple: {
    title: 'Яблоко (Круг)',
    summary:
      'Объем сосредоточен в верхней и средней части корпуса в сочетании со стройными длинными ногами.',
  },
  rectangle: {
    title: 'Прямоугольник',
    summary:
      'Сбалансированный атлетичный силуэт: плечи, талия и бедра находятся практически на одной линии.',
  },
  inverted_triangle: {
    title: 'Перевернутый треугольник',
    summary:
      'Выразительный плечевой пояс и грудь при узких бедрах и стройных ногах.',
  },
}

export const BODY_TYPES: BodyType[] = [
  'hourglass',
  'pear',
  'apple',
  'rectangle',
  'inverted_triangle',
]

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Какое описание подходит под твою фигуру?',
    options: [
      { id: 'q1_1', text: 'Бедра шире плеч, небольшая грудь', type: 'pear' },
      {
        id: 'q1_2',
        text: 'Бедра немного меньше ширины плеч, талия не выражена',
        type: 'apple',
      },
      {
        id: 'q1_3',
        text: 'Плечи и бедра одинаковой ширины, узкая талия',
        type: 'hourglass',
      },
      {
        id: 'q1_4',
        text: 'Бедра равны плечам, талия не выражена',
        type: 'rectangle',
      },
      {
        id: 'q1_5',
        text: 'Плечи больше бедер, грудь большого размера',
        type: 'inverted_triangle',
      },
    ],
  },
  {
    id: 2,
    question: 'Какая часть тела тебе нравится больше всего?',
    options: [
      { id: 'q2_1', text: 'Ярко выраженная талия', type: 'hourglass' },
      { id: 'q2_2', text: 'Длинные ноги', type: 'apple' },
      { id: 'q2_3', text: 'Широкие бедра', type: 'pear' },
      { id: 'q2_4', text: 'Пышный бюст', type: 'inverted_triangle' },
      { id: 'q2_5', text: 'Выпирающие ключицы', type: 'rectangle' },
    ],
  },
  {
    id: 3,
    question: 'Какой образ ты выберешь, чтобы подчеркнуть свои достоинства?',
    options: [
      {
        id: 'q3_1',
        text: 'Надену что-то приталенное и с увеличенным плечом',
        type: 'hourglass',
      },
      { id: 'q3_2', text: 'Одежду с прямым силуэтом', type: 'apple' },
      {
        id: 'q3_3',
        text: 'Надену свободный низ и приталенный верх',
        type: 'pear',
      },
      {
        id: 'q3_4',
        text: 'Надену верх с V-образным вырезом',
        type: 'inverted_triangle',
      },
      {
        id: 'q3_5',
        text: 'Мне без разницы, подходят все варианты',
        type: 'rectangle',
      },
    ],
  },
  {
    id: 4,
    question:
      'Когда ты поправляешься, на какую зону ты обращаешь внимание в первую очередь?',
    options: [
      { id: 'q4_1', text: 'Бедра и ноги', type: 'pear' },
      { id: 'q4_2', text: 'Живот', type: 'apple' },
      { id: 'q4_3', text: 'Талия, живот и спина', type: 'rectangle' },
      {
        id: 'q4_4',
        text: 'В области плечевого пояса',
        type: 'inverted_triangle',
      },
      { id: 'q4_5', text: 'Равномерно по всему телу', type: 'hourglass' },
    ],
  },
  {
    id: 5,
    question: 'С какой знаменитостью у тебя похожий тип фигуры?',
    options: [
      { id: 'q5_1', text: 'Мэрилин Монро', type: 'hourglass' },
      { id: 'q5_2', text: 'Кира Найтли', type: 'rectangle' },
      { id: 'q5_3', text: 'Меган Маркл', type: 'inverted_triangle' },
      { id: 'q5_4', text: 'Дженнифер Лопес', type: 'pear' },
      { id: 'q5_5', text: 'Риз Уизерспун', type: 'apple' },
    ],
  },
  {
    id: 6,
    question: 'Какую одежду тебе сложнее всего выбирать?',
    options: [
      { id: 'q6_1', text: 'Короткие платья', type: 'hourglass' },
      { id: 'q6_2', text: 'Джинсы', type: 'inverted_triangle' },
      { id: 'q6_3', text: 'Приталенные вещи', type: 'pear' },
      { id: 'q6_4', text: 'Брюки с высокой посадкой', type: 'apple' },
      { id: 'q6_5', text: 'Нет проблем с выбором одежды', type: 'rectangle' },
    ],
  },
  {
    id: 7,
    question:
      'Измерь сантиметром грудь, бедра и талию и выбери ниже разницу в измерениях:',
    options: [
      {
        id: 'q7_1',
        text: 'Грудь = бедрам (разница 2–4 см). Талия меньше груди/бедер минимум на 20–25 см',
        type: 'hourglass',
      },
      {
        id: 'q7_2',
        text: 'Грудь = бедрам (разница меньше 5 см). Талия меньше груди/бедер менее 20 см',
        type: 'rectangle',
      },
      {
        id: 'q7_3',
        text: 'Грудь больше бедер более чем на 6 см',
        type: 'inverted_triangle',
      },
      {
        id: 'q7_4',
        text: 'Бедра больше груди более чем на 6 см',
        type: 'pear',
      },
      { id: 'q7_5', text: 'Талия примерно равна груди', type: 'apple' },
      { id: 'q7_6', text: 'Затрудняюсь ответить', type: null },
    ],
  },
]
