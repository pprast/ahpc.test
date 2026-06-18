import type { Profile, Test, Question, Attempt, Certificate, Subject, Group } from '../types'

export const mockGroups: Group[] = [
  { id: 'g1', name: 'ИС-23', specialty: 'Информационные системы', year: 2023 },
  { id: 'g2', name: 'ПО-24', specialty: 'Программное обеспечение', year: 2024 },
]

export const mockSubjects: Subject[] = [
  { id: 's1', name: 'Информационные системы', description: 'Основы ИС', teacher_id: 'u2' },
  { id: 's2', name: 'Базы данных', description: 'SQL и реляционные БД', teacher_id: 'u2' },
  { id: 's3', name: 'Веб-разработка', description: 'HTML, CSS, JavaScript', teacher_id: 'u3' },
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
    shuffle_questions: true, created_at: '2026-05-10T09:00:00Z', subject: { id: 's2', name: 'Базы данных', teacher_id: 'u2' },
  },
  {
    id: 't2', title: 'HTML и CSS: базовый уровень', subject_id: 's3', teacher_id: 'u3',
    time_limit: 20, pass_score: 75, attempts_allowed: 2, is_active: true,
    shuffle_questions: false, created_at: '2026-05-15T10:30:00Z', subject: { id: 's3', name: 'Веб-разработка', teacher_id: 'u3' },
  },
  {
    id: 't3', title: 'Информационные системы предприятия', subject_id: 's1', teacher_id: 'u2',
    time_limit: 45, pass_score: 65, attempts_allowed: 1, is_active: true,
    shuffle_questions: true, created_at: '2026-06-01T08:00:00Z', subject: { id: 's1', name: 'Информационные системы', teacher_id: 'u2' },
  },
]

export const mockQuestions: Question[] = [
  {
    id: 'q1', test_id: 't1', text: 'Что такое первичный ключ (Primary Key)?',
    type: 'single', points: 2, order_index: 1,
    answers: [
      { id: 'a1', question_id: 'q1', text: 'Уникальный идентификатор каждой строки в таблице', is_correct: true },
      { id: 'a2', question_id: 'q1', text: 'Поле для хранения паролей', is_correct: false },
      { id: 'a3', question_id: 'q1', text: 'Индекс для ускорения поиска', is_correct: false },
      { id: 'a4', question_id: 'q1', text: 'Связь между двумя таблицами', is_correct: false },
    ],
  },
  {
    id: 'q2', test_id: 't1', text: 'Выберите все типы связей в реляционных базах данных:',
    type: 'multiple', points: 3, order_index: 2,
    answers: [
      { id: 'a5', question_id: 'q2', text: 'Один к одному (1:1)', is_correct: true },
      { id: 'a6', question_id: 'q2', text: 'Один ко многим (1:N)', is_correct: true },
      { id: 'a7', question_id: 'q2', text: 'Многие ко многим (N:M)', is_correct: true },
      { id: 'a8', question_id: 'q2', text: 'Ноль к нулю (0:0)', is_correct: false },
    ],
  },
  {
    id: 'q3', test_id: 't1', text: 'SQL расшифровывается как Structured Query Language?',
    type: 'truefalse', points: 1, order_index: 3,
    answers: [
      { id: 'a9', question_id: 'q3', text: 'Верно', is_correct: true },
      { id: 'a10', question_id: 'q3', text: 'Неверно', is_correct: false },
    ],
  },
  {
    id: 'q4', test_id: 't1', text: 'Какой оператор SQL используется для выборки данных?',
    type: 'single', points: 2, order_index: 4,
    answers: [
      { id: 'a11', question_id: 'q4', text: 'SELECT', is_correct: true },
      { id: 'a12', question_id: 'q4', text: 'GET', is_correct: false },
      { id: 'a13', question_id: 'q4', text: 'FETCH', is_correct: false },
      { id: 'a14', question_id: 'q4', text: 'RETRIEVE', is_correct: false },
    ],
  },
  {
    id: 'q5', test_id: 't1', text: 'Нормализация базы данных — это процесс устранения избыточности данных?',
    type: 'truefalse', points: 1, order_index: 5,
    answers: [
      { id: 'a15', question_id: 'q5', text: 'Верно', is_correct: true },
      { id: 'a16', question_id: 'q5', text: 'Неверно', is_correct: false },
    ],
  },
]

export const mockAttempts: Attempt[] = [
  {
    id: 'att1', test_id: 't1', student_id: 'u1',
    started_at: '2026-06-10T10:00:00Z', finished_at: '2026-06-10T10:25:00Z',
    score: 92, passed: true, attempt_number: 1, test: mockTests[0],
  },
  {
    id: 'att2', test_id: 't2', student_id: 'u1',
    started_at: '2026-06-12T14:00:00Z', finished_at: '2026-06-12T14:18:00Z',
    score: 78, passed: true, attempt_number: 1, test: mockTests[1],
  },
  {
    id: 'att3', test_id: 't3', student_id: 'u1',
    started_at: '2026-06-15T09:00:00Z', finished_at: '2026-06-15T09:40:00Z',
    score: 55, passed: false, attempt_number: 1, test: mockTests[2],
  },
]

export const mockCertificates: Certificate[] = [
  {
    id: 'cert1', student_id: 'u1', test_id: 't1', attempt_id: 'att1',
    issued_at: '2026-06-10T10:30:00Z', certificate_code: 'AVPK-2026-00001',
    test: mockTests[0], attempt: mockAttempts[0],
  },
  {
    id: 'cert2', student_id: 'u1', test_id: 't2', attempt_id: 'att2',
    issued_at: '2026-06-12T14:20:00Z', certificate_code: 'AVPK-2026-00002',
    test: mockTests[1], attempt: mockAttempts[1],
  },
]
