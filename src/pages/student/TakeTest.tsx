import { useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Timer from '../../components/test/Timer'
import { mockTests, mockQuestions } from '../../lib/mockData'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function TakeTest() {
  const { id } = useParams()
  const navigate = useNavigate()
  const test = mockTests.find(t => t.id === id)
  const questions = mockQuestions.filter(q => q.test_id === id)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({})

  const handleExpire = useCallback(() => {
    navigate('/student/results', { state: { score: 0, testTitle: test?.title, passed: false } })
  }, [navigate, test])

  if (!test || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#9CA3AF] mb-4">Тест не найден</p>
          <button onClick={() => navigate('/student/tests')} className="px-4 py-2 bg-[#C8410A] text-white text-sm rounded hover:bg-[#A33508]">
            Назад к тестам
          </button>
        </div>
      </div>
    )
  }

  const current = questions[currentIndex]

  const toggleAnswer = (answerId: string) => {
    setSelectedAnswers(prev => {
      const existing = prev[current.id] || []
      if (current.type === 'single' || current.type === 'truefalse') return { ...prev, [current.id]: [answerId] }
      return { ...prev, [current.id]: existing.includes(answerId) ? existing.filter(a => a !== answerId) : [...existing, answerId] }
    })
  }

  const calcScore = () => {
    let correct = 0, total = 0
    questions.forEach(q => {
      if (!q.answers) return
      total += q.points
      const correctIds = q.answers.filter(a => a.is_correct).map(a => a.id).sort()
      const selected = (selectedAnswers[q.id] || []).sort()
      if (JSON.stringify(correctIds) === JSON.stringify(selected)) correct += q.points
    })
    return total > 0 ? Math.round((correct / total) * 100) : 0
  }

  const handleFinish = () => {
    const score = calcScore()
    navigate('/student/results', { state: { score, testTitle: test.title, passed: score >= test.pass_score } })
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-[#DDE1E7] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="hidden sm:flex items-center gap-1">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 transition-all rounded-full ${
                    i === currentIndex ? 'w-6 bg-[#C8410A]'
                    : selectedAnswers[questions[i].id]?.length ? 'w-3 bg-[#DDE1E7]'
                    : 'w-1.5 bg-[#E8EAED]'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-[#4B5563] truncate">
              <span className="font-mono font-bold text-[#111827]">{currentIndex + 1}</span>
              <span className="text-[#9CA3AF]">/{questions.length}</span>
              <span className="ml-2 hidden sm:inline text-[#9CA3AF]">— {test.title}</span>
            </p>
          </div>
          <Timer totalSeconds={test.time_limit * 60} onExpire={handleExpire} />
        </div>
      </div>

      {/* Content - two columns on desktop */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-5 py-8 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Question */}
        <div className="lg:col-span-3">
          <div className="flex items-start gap-3 mb-2">
            <span className="font-mono text-xs font-bold text-[#9CA3AF] mt-1 flex-shrink-0 uppercase tracking-wider">
              Вопрос {currentIndex + 1}
            </span>
          </div>
          <p className="font-display font-semibold text-[#111827] text-xl leading-snug tracking-tight">
            {current.text}
          </p>
          <p className="text-xs text-[#9CA3AF] mt-3">
            {current.type === 'single' || current.type === 'truefalse' ? 'Один верный ответ' : 'Несколько верных ответов'}
            {' · '}{current.points} {current.points === 1 ? 'балл' : 'балла'}
          </p>
        </div>

        {/* Answers */}
        <div className="lg:col-span-2 space-y-2">
          {current.answers?.map(answer => {
            const isSelected = (selectedAnswers[current.id] || []).includes(answer.id)
            return (
              <button
                key={answer.id}
                onClick={() => toggleAnswer(answer.id)}
                className={`w-full text-left px-4 py-3.5 rounded border-l-[3px] border transition-all duration-150 text-sm ${
                  isSelected
                    ? 'border-l-[#C8410A] border-[#C8410A]/20 bg-[#FEF3EE] text-[#C8410A] font-medium'
                    : 'border-l-[#DDE1E7] border-[#DDE1E7] bg-white text-[#111827] hover:border-l-[#9CA3AF] hover:bg-[#F0F2F5]'
                }`}
              >
                {answer.text}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#DDE1E7] bg-white">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentIndex(i => i - 1)}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#4B5563] border border-[#DDE1E7] rounded bg-white hover:bg-[#F0F2F5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Назад
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(i => i + 1)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#111827] text-white rounded hover:bg-[#1F2937] transition-colors"
            >
              Далее <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-5 py-2 text-sm font-medium bg-[#C8410A] text-white rounded hover:bg-[#A33508] transition-colors"
            >
              Завершить тест
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
