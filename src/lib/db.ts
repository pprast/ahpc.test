import type { Group, Subject, Test, Question, Answer, Attempt, Certificate } from '../types'
import { mockGroups, mockSubjects, mockTests, mockQuestions } from './mockData'

export interface StoredUser {
  id: string
  email: string
  password: string
  full_name: string
  role: 'student' | 'teacher' | 'admin'
  group_id: string | null
}

const K = {
  init: 'tc_v1',
  users: 'tc_users',
  groups: 'tc_groups',
  subjects: 'tc_subjects',
  tests: 'tc_tests',
  questions: 'tc_questions',
  answers: 'tc_answers',
  attempts: 'tc_attempts',
  certificates: 'tc_certificates',
  session: 'tc_session',
}

function read<T>(key: string): T[] {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}

function write<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function initDb() {
  if (localStorage.getItem(K.init)) return

  write(K.groups, mockGroups)
  write(K.subjects, mockSubjects)
  write(K.tests, mockTests)
  write(K.questions, mockQuestions.map(({ answers: _, ...q }) => q))
  write(K.answers, mockQuestions.flatMap(q => q.answers || []))
  write(K.attempts, [])
  write(K.certificates, [])
  write<StoredUser>(K.users, [
    { id: 'u1', email: 'student@avpk.kz', password: '123456', full_name: 'Айдар Нурланов', role: 'student', group_id: 'g1' },
    { id: 'u2', email: 'teacher@avpk.kz', password: '123456', full_name: 'Гүлнәр Сейткали', role: 'teacher', group_id: null },
    { id: 'u3', email: 'admin@avpk.kz', password: '123456', full_name: 'Администратор Системы', role: 'admin', group_id: null },
  ])
  localStorage.setItem(K.init, '1')
}

export const db = {
  // Auth
  findUser(email: string, password: string): StoredUser | null {
    return read<StoredUser>(K.users).find(u => u.email === email && u.password === password) ?? null
  },

  getUserById(id: string): StoredUser | null {
    return read<StoredUser>(K.users).find(u => u.id === id) ?? null
  },

  createUser(user: StoredUser): void {
    const users = read<StoredUser>(K.users)
    if (users.find(u => u.email === user.email)) throw new Error('Пользователь с таким email уже зарегистрирован')
    write(K.users, [...users, user])
  },

  // Session
  getSession(): string | null {
    return localStorage.getItem(K.session)
  },

  setSession(userId: string | null): void {
    if (userId) localStorage.setItem(K.session, userId)
    else localStorage.removeItem(K.session)
  },

  // Groups
  getGroups(): Group[] {
    return read<Group>(K.groups).sort((a, b) => b.year - a.year)
  },

  // Subjects
  getSubjects(): Subject[] {
    return read<Subject>(K.subjects)
  },

  // Tests
  getTests(activeOnly = false): Test[] {
    const subjects = read<Subject>(K.subjects)
    return read<Test>(K.tests)
      .filter(t => !activeOnly || t.is_active)
      .map(t => ({ ...t, subject: subjects.find(s => s.id === t.subject_id) }))
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
  },

  getTestById(id: string): Test | null {
    const subjects = read<Subject>(K.subjects)
    const test = read<Test>(K.tests).find(t => t.id === id)
    if (!test) return null
    return { ...test, subject: subjects.find(s => s.id === test.subject_id) }
  },

  getTestsByTeacher(teacherId: string): Test[] {
    return db.getTests().filter(t => t.teacher_id === teacherId)
  },

  createTest(test: Omit<Test, 'id' | 'created_at'>): Test {
    const newTest: Test = { ...test, id: `t-${Date.now()}`, created_at: new Date().toISOString() }
    write(K.tests, [...read<Test>(K.tests), newTest])
    return newTest
  },

  // Questions
  getQuestionsByTest(testId: string): Question[] {
    const answers = read<Answer>(K.answers)
    return read<Question>(K.questions)
      .filter(q => q.test_id === testId)
      .sort((a, b) => a.order_index - b.order_index)
      .map(q => ({ ...q, answers: answers.filter(a => a.question_id === q.id) }))
  },

  createQuestion(question: Omit<Question, 'id'>): Question {
    const newQ: Question = { ...question, id: `q-${Date.now()}-${Math.random().toString(36).slice(2)}` }
    write(K.questions, [...read<Question>(K.questions), newQ])
    return newQ
  },

  createAnswer(answer: Omit<Answer, 'id'>): Answer {
    const newA: Answer = { ...answer, id: `a-${Date.now()}-${Math.random().toString(36).slice(2)}` }
    write(K.answers, [...read<Answer>(K.answers), newA])
    return newA
  },

  // Attempts
  getAttemptsByStudent(studentId: string): Attempt[] {
    const tests = db.getTests()
    return read<Attempt>(K.attempts)
      .filter(a => a.student_id === studentId)
      .sort((a, b) => b.started_at.localeCompare(a.started_at))
      .map(a => ({ ...a, test: tests.find(t => t.id === a.test_id) }))
  },

  getAttemptsByTests(testIds: string[]): Attempt[] {
    return read<Attempt>(K.attempts).filter(a => testIds.includes(a.test_id))
  },

  countAttempts(testId: string, studentId: string): number {
    return read<Attempt>(K.attempts).filter(a => a.test_id === testId && a.student_id === studentId).length
  },

  createAttempt(attempt: Omit<Attempt, 'id'>): Attempt {
    const newAttempt: Attempt = { ...attempt, id: `att-${Date.now()}` }
    write(K.attempts, [...read<Attempt>(K.attempts), newAttempt])
    return newAttempt
  },

  // Certificates
  getCertificatesByStudent(studentId: string): Certificate[] {
    const tests = db.getTests()
    const attempts = read<Attempt>(K.attempts)
    return read<Certificate>(K.certificates)
      .filter(c => c.student_id === studentId)
      .sort((a, b) => b.issued_at.localeCompare(a.issued_at))
      .map(c => ({
        ...c,
        test: tests.find(t => t.id === c.test_id),
        attempt: attempts.find(a => a.id === c.attempt_id),
      }))
  },

  createCertificate(cert: Omit<Certificate, 'id'>): Certificate {
    const newCert: Certificate = { ...cert, id: `cert-${Date.now()}` }
    write(K.certificates, [...read<Certificate>(K.certificates), newCert])
    return newCert
  },
}
