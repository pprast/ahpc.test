import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Progress } from '../../components/ui/progress'
import Timer from '../../components/test/Timer'
import { db } from '../../lib/db'
import { useAuthStore } from '../../store/authStore'
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Test, Question } from '../../types'

export default function TakeTest() {
  const { id: testId } = useParams()
  const navigate = useNavigate()
  const [test, setTest] = useState<Test | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({})
  const [startedAt] = useState(new Date())

  useEffect(() => {
    if (!testId) return
    setTest(db.getTestById(testId))
    setQuestions(db.getQuestionsByTest(testId))
    setLoading(false)
  }, [testId])

  const saveAttempt = useCallback((score: number, passed: boolean) => {
    const user = useAuthStore.getState().user
    if (!user || !testId) return

    const attemptNumber = db.countAttempts(testId, user.id) + 1
    const attempt = db.createAttempt({
      test_id: testId,
      student_id: user.id,
      started_at: startedAt.toISOString(),
      finished_at: new Date().toISOString(),
      score,
      passed,
      attempt_number: attemptNumber,
    })

    if (passed) {
      const code = `AVPK-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`
      db.createCertificate({
        student_id: user.id,
        test_id: testId,
        attempt_id: attempt.id,
        issued_at: new Date().toISOString(),
        certificate_code: code,
      })
    }

    navigate('/student/results', { state: { score, testTitle: test?.title, passed } })
  }, [test, testId, startedAt, navigate])

  const calcScore = useCallback(() => {
    let correct = 0, total = 0
    questions.forEach(q => {
      if (!q.answers) return
      total += q.points
      const correctIds = q.answers.filter(a => a.is_correct).map(a => a.id).sort()
      const selected = (selectedAnswers[q.id] || []).sort()
      if (JSON.stringify(correctIds) === JSON.stringify(selected)) correct += q.points
    })
    return total > 0 ? Math.round((correct / total) * 100) : 0
  }, [questions, selectedAnswers])

  const handleExpire = useCallback(() => {
    const score = calcScore()
    saveAttempt(score, score >= (test?.pass_score || 70))
  }, [calcScore, saveAttempt, test])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1E40AF] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!test || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Тест не найден</p>
          <Button className="mt-4 bg-[#1E40AF]" onClick={() => navigate('/student/tests')}>Назад к тестам</Button>
        </div>
      </div>
    )
  }

  const current = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const toggleAnswer = (answerId: string) => {
    setSelectedAnswers(prev => {
      const existing = prev[current.id] || []
      if (current.type === 'single' || current.type === 'truefalse') return { ...prev, [current.id]: [answerId] }
      return { ...prev, [current.id]: existing.includes(answerId) ? existing.filter(id => id !== answerId) : [...existing, answerId] }
    })
  }

  const handleFinish = () => {
    const score = calcScore()
    saveAttempt(score, score >= test.pass_score)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{test.title}</p>
            <p className="text-xs text-slate-500">Вопрос {currentIndex + 1} из {questions.length}</p>
          </div>
          <Timer totalSeconds={test.time_limit * 60} onExpire={handleExpire} />
        </div>
        <Progress value={progress} className="h-1 rounded-none" />
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-8">
            <div className="flex items-start gap-3 mb-6">
              <span className="bg-[#1E40AF] text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5">{currentIndex + 1}</span>
              <p className="text-lg font-medium text-slate-900 leading-relaxed">{current.text}</p>
            </div>
            <div className="space-y-3">
              {current.answers?.map(answer => {
                const isSelected = (selectedAnswers[current.id] || []).includes(answer.id)
                return (
                  <button key={answer.id} onClick={() => toggleAnswer(answer.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-lg border-2 transition-all duration-150 text-sm font-medium ${isSelected ? 'border-[#1E40AF] bg-blue-50 text-[#1E40AF]' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'}`}>
                    {answer.text}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center justify-between gap-4">
          <Button variant="outline" onClick={() => setCurrentIndex(i => i - 1)} disabled={currentIndex === 0} className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Назад
          </Button>
          <div className="flex gap-1.5">
            {questions.map((q, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentIndex ? 'bg-[#1E40AF]' : selectedAnswers[q.id]?.length ? 'bg-blue-200' : 'bg-slate-200'}`} />
            ))}
          </div>
          {currentIndex < questions.length - 1 ? (
            <Button onClick={() => setCurrentIndex(i => i + 1)} className="gap-2 bg-[#1E40AF] hover:bg-[#1d3a9e]">
              Вперёд <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleFinish} className="gap-2 bg-emerald-600 hover:bg-emerald-700">Завершить тест</Button>
          )}
        </div>
      </div>
    </div>
  )
}
