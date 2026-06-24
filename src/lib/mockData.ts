import type { Profile, Test, Question, Attempt, Certificate, Subject, Group } from '../types'

export const mockGroups: Group[] = [
  { id: 'g1', name: 'ИС-23', specialty: 'Информационные системы', year: 2023 },
  { id: 'g2', name: 'ПО-24', specialty: 'Программное обеспечение', year: 2024 },
]

export const mockSubjects: Subject[] = [
  { id: 's1', name: 'Информационные системы', description: 'Основы ИС', teacher_id: 'u2' },
  { id: 's2', name: 'Базы данных', description: 'SQL и реляционные БД', teacher_id: 'u2' },
  { id: 's3', name: 'Веб-разработка', description: 'HTML, CSS, JavaScript', teacher_id: 'u2' },
]

export const mockStudentProfile: Profile = {
  id: 'u1', user_id: 'u1', full_name: 'Айдар Нурланов', role: 'student', group_id: 'g1',
}
export const mockTeacherProfile: Profile = {
  id: 'u2', user_id: 'u2', full_name: 'Гүлнәр Сейткали', role: 'teacher',
}
export const mockAdminProfile: Profile = {
  id: 'u3', user_id: 'u3', full_name: 'Администратор Системы', role: 'admin',
}

export const mockTests: Test[] = [
  {
    id: 't1', title: 'Основы реляционных баз данных', subject_id: 's2', teacher_id: 'u2',
    time_limit: 30, pass_score: 70, attempts_allowed: 3, is_active: true,
    shuffle_questions: false, created_at: '2026-05-10T09:00:00Z',
  },
  {
    id: 't2', title: 'HTML и CSS: базовый уровень', subject_id: 's3', teacher_id: 'u2',
    time_limit: 20, pass_score: 75, attempts_allowed: 2, is_active: true,
    shuffle_questions: false, created_at: '2026-05-15T10:30:00Z',
  },
  {
    id: 't3', title: 'Информационные системы предприятия', subject_id: 's1', teacher_id: 'u2',
    time_limit: 45, pass_score: 65, attempts_allowed: 1, is_active: true,
    shuffle_questions: false, created_at: '2026-06-01T08:00:00Z',
  },
]

export const mockQuestions: Question[] = [
  // t1 — Базы данных
  {
    id: 'q1', test_id: 't1', text: 'Что такое первичный ключ (Primary Key)?',
    type: 'single', points: 2, order_index: 0,
    answers: [
      { id: 'a1', question_id: 'q1', text: 'Уникальный идентификатор каждой строки в таблице', is_correct: true },
      { id: 'a2', question_id: 'q1', text: 'Поле для хранения паролей', is_correct: false },
      { id: 'a3', question_id: 'q1', text: 'Индекс для ускорения поиска', is_correct: false },
      { id: 'a4', question_id: 'q1', text: 'Связь между двумя таблицами', is_correct: false },
    ],
  },
  {
    id: 'q2', test_id: 't1', text: 'Выберите все типы связей в реляционных базах данных:',
    type: 'multiple', points: 3, order_index: 1,
    answers: [
      { id: 'a5', question_id: 'q2', text: 'Один к одному (1:1)', is_correct: true },
      { id: 'a6', question_id: 'q2', text: 'Один ко многим (1:N)', is_correct: true },
      { id: 'a7', question_id: 'q2', text: 'Многие ко многим (N:M)', is_correct: true },
      { id: 'a8', question_id: 'q2', text: 'Ноль к нулю (0:0)', is_correct: false },
    ],
  },
  {
    id: 'q3', test_id: 't1', text: 'SQL расшифровывается как Structured Query Language?',
    type: 'truefalse', points: 1, order_index: 2,
    answers: [
      { id: 'a9', question_id: 'q3', text: 'Верно', is_correct: true },
      { id: 'a10', question_id: 'q3', text: 'Неверно', is_correct: false },
    ],
  },
  {
    id: 'q4', test_id: 't1', text: 'Какой оператор SQL используется для выборки данных?',
    type: 'single', points: 2, order_index: 3,
    answers: [
      { id: 'a11', question_id: 'q4', text: 'SELECT', is_correct: true },
      { id: 'a12', question_id: 'q4', text: 'GET', is_correct: false },
      { id: 'a13', question_id: 'q4', text: 'FETCH', is_correct: false },
      { id: 'a14', question_id: 'q4', text: 'RETRIEVE', is_correct: false },
    ],
  },
  {
    id: 'q5', test_id: 't1', text: 'Нормализация базы данных — это процесс устранения избыточности данных?',
    type: 'truefalse', points: 1, order_index: 4,
    answers: [
      { id: 'a15', question_id: 'q5', text: 'Верно', is_correct: true },
      { id: 'a16', question_id: 'q5', text: 'Неверно', is_correct: false },
    ],
  },
  // t2 — HTML и CSS
  {
    id: 'q6', test_id: 't2', text: 'Что означает аббревиатура HTML?',
    type: 'single', points: 2, order_index: 0,
    answers: [
      { id: 'a17', question_id: 'q6', text: 'Hypertext Markup Language', is_correct: true },
      { id: 'a18', question_id: 'q6', text: 'Hyperlink Text Module Language', is_correct: false },
      { id: 'a19', question_id: 'q6', text: 'High Transfer Markup Language', is_correct: false },
      { id: 'a20', question_id: 'q6', text: 'Home Tool Markup Language', is_correct: false },
    ],
  },
  {
    id: 'q7', test_id: 't2', text: 'Какой тег используется для создания гиперссылки?',
    type: 'single', points: 2, order_index: 1,
    answers: [
      { id: 'a21', question_id: 'q7', text: '<a>', is_correct: true },
      { id: 'a22', question_id: 'q7', text: '<link>', is_correct: false },
      { id: 'a23', question_id: 'q7', text: '<href>', is_correct: false },
      { id: 'a24', question_id: 'q7', text: '<url>', is_correct: false },
    ],
  },
  {
    id: 'q8', test_id: 't2', text: 'CSS расшифровывается как Cascading Style Sheets?',
    type: 'truefalse', points: 1, order_index: 2,
    answers: [
      { id: 'a25', question_id: 'q8', text: 'Верно', is_correct: true },
      { id: 'a26', question_id: 'q8', text: 'Неверно', is_correct: false },
    ],
  },
  {
    id: 'q9', test_id: 't2', text: 'Какое свойство CSS используется для изменения цвета текста?',
    type: 'single', points: 2, order_index: 3,
    answers: [
      { id: 'a27', question_id: 'q9', text: 'color', is_correct: true },
      { id: 'a28', question_id: 'q9', text: 'font-color', is_correct: false },
      { id: 'a29', question_id: 'q9', text: 'text-color', is_correct: false },
      { id: 'a30', question_id: 'q9', text: 'foreground', is_correct: false },
    ],
  },
  {
    id: 'q10', test_id: 't2', text: 'Выберите блочные HTML-элементы:',
    type: 'multiple', points: 3, order_index: 4,
    answers: [
      { id: 'a31', question_id: 'q10', text: '<div>', is_correct: true },
      { id: 'a32', question_id: 'q10', text: '<p>', is_correct: true },
      { id: 'a33', question_id: 'q10', text: '<span>', is_correct: false },
      { id: 'a34', question_id: 'q10', text: '<h1>', is_correct: true },
    ],
  },
  // t3 — Информационные системы предприятия
  {
    id: 'q11', test_id: 't3', text: 'Что такое ERP-система?',
    type: 'single', points: 2, order_index: 0,
    answers: [
      { id: 'a35', question_id: 'q11', text: 'Enterprise Resource Planning — система управления ресурсами предприятия', is_correct: true },
      { id: 'a36', question_id: 'q11', text: 'Electronic Record Protocol', is_correct: false },
      { id: 'a37', question_id: 'q11', text: 'Extended Resource Program', is_correct: false },
      { id: 'a38', question_id: 'q11', text: 'Enterprise Reporting Platform', is_correct: false },
    ],
  },
  {
    id: 'q12', test_id: 't3', text: 'К корпоративным информационным системам относятся:',
    type: 'multiple', points: 3, order_index: 1,
    answers: [
      { id: 'a39', question_id: 'q12', text: 'CRM', is_correct: true },
      { id: 'a40', question_id: 'q12', text: 'ERP', is_correct: true },
      { id: 'a41', question_id: 'q12', text: 'BIOS', is_correct: false },
      { id: 'a42', question_id: 'q12', text: 'SCM', is_correct: true },
    ],
  },
  {
    id: 'q13', test_id: 't3', text: 'Информационная система предприятия помогает автоматизировать бизнес-процессы?',
    type: 'truefalse', points: 1, order_index: 2,
    answers: [
      { id: 'a43', question_id: 'q13', text: 'Верно', is_correct: true },
      { id: 'a44', question_id: 'q13', text: 'Неверно', is_correct: false },
    ],
  },
  {
    id: 'q14', test_id: 't3', text: 'Какая система управляет взаимоотношениями с клиентами?',
    type: 'single', points: 2, order_index: 3,
    answers: [
      { id: 'a45', question_id: 'q14', text: 'CRM (Customer Relationship Management)', is_correct: true },
      { id: 'a46', question_id: 'q14', text: 'ERP (Enterprise Resource Planning)', is_correct: false },
      { id: 'a47', question_id: 'q14', text: 'SCM (Supply Chain Management)', is_correct: false },
      { id: 'a48', question_id: 'q14', text: 'HRM (Human Resource Management)', is_correct: false },
    ],
  },
  {
    id: 'q15', test_id: 't3', text: 'Интранет — это внутренняя корпоративная сеть предприятия?',
    type: 'truefalse', points: 1, order_index: 4,
    answers: [
      { id: 'a49', question_id: 'q15', text: 'Верно', is_correct: true },
      { id: 'a50', question_id: 'q15', text: 'Неверно', is_correct: false },
    ],
  },
]

export const mockAttempts: Attempt[] = []
export const mockCertificates: Certificate[] = []
