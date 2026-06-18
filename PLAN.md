# TestCenter — Платформа тестирования знаний
## Актюбинский высший политехнический колледж

---

## Стек технологий

| Слой | Технология | Причина выбора |
|------|-----------|----------------|
| Frontend | React + Vite | Быстрая сборка, SPA |
| Стили | Tailwind CSS | Утилитарный CSS, быстрая вёрстка |
| Маршрутизация | React Router v6 | Стандарт для React SPA |
| Состояние | Zustand | Лёгкий стейт-менеджер |
| Формы | React Hook Form + Zod | Валидация форм |
| UI-компоненты | shadcn/ui | Готовые компоненты под Tailwind |
| База данных | Supabase (PostgreSQL) | Бесплатный хостинг БД, Auth из коробки, REST API |
| Аутентификация | Supabase Auth | JWT, роли, сессии |
| PDF (сертификаты) | @react-pdf/renderer | Генерация PDF прямо в браузере |
| Деплой | Vercel или Netlify | Бесплатный хостинг, CI/CD из коробки |

---

## Структура проекта

```
testcenter/
├── src/
│   ├── assets/              # Логотип колледжа, изображения
│   ├── components/
│   │   ├── ui/              # Переиспользуемые UI-компоненты (кнопки, карточки, модалки)
│   │   ├── layout/          # Header, Sidebar, Footer, PageLayout
│   │   ├── auth/            # LoginForm, RegisterForm, ProtectedRoute
│   │   ├── test/            # TestCard, QuestionBlock, Timer, ResultCard
│   │   ├── certificate/     # CertificateTemplate, CertificatePreview
│   │   └── dashboard/       # StatsCard, ResultsTable, SubjectList
│   ├── pages/
│   │   ├── Landing.tsx      # Главная страница (публичная)
│   │   ├── Login.tsx        # Вход
│   │   ├── Register.tsx     # Регистрация
│   │   ├── student/
│   │   │   ├── Dashboard.tsx       # Главная студента
│   │   │   ├── TestList.tsx        # Доступные тесты
│   │   │   ├── TakeTest.tsx        # Прохождение теста
│   │   │   ├── Results.tsx         # История результатов
│   │   │   └── Certificates.tsx    # Мои сертификаты
│   │   ├── teacher/
│   │   │   ├── Dashboard.tsx       # Главная преподавателя
│   │   │   ├── CreateTest.tsx      # Создание теста
│   │   │   ├── EditTest.tsx        # Редактирование теста
│   │   │   ├── TestResults.tsx     # Результаты студентов по тесту
│   │   │   └── Students.tsx        # Список студентов группы
│   │   └── admin/
│   │       ├── Dashboard.tsx       # Главная администратора
│   │       ├── Users.tsx           # Управление пользователями
│   │       ├── Groups.tsx          # Управление группами
│   │       └── Subjects.tsx        # Управление предметами
│   ├── hooks/               # useAuth, useTest, useResults, useTimer
│   ├── lib/
│   │   ├── supabase.ts      # Клиент Supabase
│   │   └── utils.ts         # Вспомогательные функции
│   ├── store/               # Zustand store (auth, test, ui)
│   ├── types/               # TypeScript типы/интерфейсы
│   └── router.tsx           # Роутинг с защищёнными маршрутами
├── supabase/
│   └── schema.sql           # Схема базы данных
├── PLAN.md
├── package.json
└── .env.local               # Supabase URL + анонимный ключ
```

---

## Схема базы данных

### Таблицы

```
users (через Supabase Auth)
  id, email, created_at

profiles
  id, user_id, full_name, role (student|teacher|admin),
  group_id, avatar_url

groups
  id, name (напр. "ИС-23"), specialty, year

subjects
  id, name, description, teacher_id

tests
  id, title, subject_id, teacher_id,
  time_limit (мин), pass_score (%), attempts_allowed,
  is_active, shuffle_questions, created_at

questions
  id, test_id, text, type (single|multiple|truefalse|text),
  points, order_index

answers
  id, question_id, text, is_correct

test_assignments
  id, test_id, group_id (или student_id), assigned_at, due_date

attempts
  id, test_id, student_id, started_at, finished_at,
  score, passed, attempt_number

attempt_answers
  id, attempt_id, question_id, answer_ids[], text_answer

certificates
  id, student_id, test_id, attempt_id,
  issued_at, certificate_code (UUID для верификации)
```

---

## Роли и права доступа

### Студент
- Просмотр назначенных тестов
- Прохождение теста (с таймером)
- Просмотр своих результатов
- Скачивание сертификатов (если прошёл аттестацию)

### Преподаватель
- Создание/редактирование тестов и вопросов
- Назначение тестов группам или отдельным студентам
- Просмотр результатов своих студентов
- Экспорт результатов (CSV)

### Администратор
- Всё, что у преподавателя
- Управление пользователями (создание, блокировка, смена роли)
- Управление группами и специальностями
- Управление предметами
- Сводная аналитика по колледжу

---

## Экраны UI (приоритет)

### Фаза 1 — Внешний вид (текущий приоритет)
- [ ] Landing Page — публичная страница колледжа с описанием платформы
- [ ] Login / Register — страницы авторизации
- [ ] Dashboard студента — карточки тестов, статистика, сертификаты
- [ ] Прохождение теста — интерфейс с таймером, вопросами, прогрессом
- [ ] Экран результата — баллы, правильные ответы, кнопка сертификата
- [ ] Dashboard преподавателя — список тестов, результаты студентов
- [ ] Создание теста — форма с добавлением вопросов и вариантов ответов
- [ ] Шаблон сертификата — PDF с логотипом, ФИО, оценкой, QR-кодом

### Фаза 2 — Логика и API
- [ ] Подключение Supabase Auth
- [ ] CRUD тестов, вопросов, назначений
- [ ] Логика прохождения теста (таймер, сохранение ответов)
- [ ] Автоматическое выставление оценок
- [ ] Генерация и хранение сертификатов
- [ ] Защищённые маршруты по ролям

### Фаза 3 — Полировка и деплой
- [ ] Адаптация под мобильные устройства
- [ ] Казахский язык (i18n)
- [ ] Экспорт результатов в Excel/CSV
- [ ] QR-верификация сертификатов (публичная страница)
- [ ] Деплой на Vercel + Supabase

---

## Дизайн-система

**Цвета (предлагаемые):**
- Primary: `#1E40AF` (синий — официальный цвет колледжа)
- Accent: `#F59E0B` (жёлтый/золотой)
- Success: `#10B981`
- Danger: `#EF4444`
- Background: `#F8FAFC`

**Типографика:**
- Заголовки: Inter Bold
- Текст: Inter Regular
- Монospace (для кодов): JetBrains Mono

---

## Сертификат — состав

```
┌────────────────────────────────────────────────────┐
│  [Логотип колледжа]                                │
│  Актюбинский высший политехнический колледж        │
│                                                    │
│              С Е Р Т И Ф И К А Т                  │
│          об успешном прохождении аттестации        │
│                                                    │
│  Выдан: Иванов Иван Иванович                       │
│  Предмет: Информационные системы                   │
│  Результат: 92% | Оценка: Отлично                  │
│  Дата: 17 июня 2026 г.                             │
│                                                    │
│  [QR-код верификации]    [Подпись преподавателя]   │
│  Код: ABC-2026-00123                               │
└────────────────────────────────────────────────────┘
```

---

## Следующий шаг

Начинаем с **Фазы 1** — создаём структуру проекта и верстаем UI:
1. `npx create-vite@latest testcenter --template react-ts`
2. Подключаем Tailwind + shadcn/ui
3. Верстаем Landing Page → Login → Dashboard студента → Тест → Результат
