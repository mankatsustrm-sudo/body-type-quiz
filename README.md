# Квиз «Определение типа фигуры»

React + TypeScript + Tailwind + Lucide. Логика и тексты — строго по ТЗ.

## Запуск

```bash
cd body-type-quiz
npm install
npm run dev
```

Превью production-сборки: `npm run build && npm run preview`

Локально: http://127.0.0.1:5173/

## Что внутри

- Welcome → 7 вопросов → результат
- Прогресс-бар, «Назад» со 2-го вопроса, подсветка выбранного ответа
- Скоринг `+1` за тип, Q7 `null` = 0, tie-breaker Q7 → Q1
- Разбивка по баллам/%, кнопка «Пройти заново»
- Готовность к Telegram WebApp (`telegram-web-app.js`)

## BotHelp / Telegram

Поля в кабинете Marusiawb уже заведены (`quiz_q1`…`quiz_q7`, `quiz_result_*`, `score_*`).
Формулы для шага «Формула»: `bothelp-formula.txt`, `bothelp-formula-result.txt`.
Схема цепочки: `BOTHELP.md`.
