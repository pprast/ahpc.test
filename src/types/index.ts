export type Role = 'student' | 'teacher' | 'admin'

export interface Profile {
  id: string
  user_id: string
  full_name: string
  role: Role
  group_id?: string
  avatar_url?: string
}

export interface Group {
  id: string
  name: string
  specialty: string
  year: number
}

export interface Subject {
  id: string
  name: string
  description?: string
  teacher_id: string
}

export interface Test {
  id: string
  title: string
  subject_id: string
  teacher_id: string
  time_limit: number
  pass_score: number
  attempts_allowed: number
  is_active: boolean
  shuffle_questions: boolean
  created_at: string
  subject?: Subject
}

export interface Question {
  id: string
  test_id: string
  text: string
  type: 'single' | 'multiple' | 'truefalse' | 'text'
  points: number
  order_index: number
  answers?: Answer[]
}

export interface Answer {
  id: string
  question_id: string
  text: string
  is_correct: boolean
}

export interface Attempt {
  id: string
  test_id: string
  student_id: string
  started_at: string
  finished_at?: string
  score: number
  passed: boolean
  attempt_number: number
  test?: Test
}

export interface Certificate {
  id: string
  student_id: string
  test_id: string
  attempt_id: string
  issued_at: string
  certificate_code: string
  test?: Test
  attempt?: Attempt
}
