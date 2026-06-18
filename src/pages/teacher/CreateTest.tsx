import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import { mockSubjects } from '../../lib/mockData'
import { Plus, Trash2, Check } from 'lucide-react'

interface LocalAnswer { localId: string; text: string; is_correct: boolean }
interface LocalQuestion { localId: string; text: string; type: string; points: number; answers: LocalAnswer[] }

const inputClass = "w-full px-3 py-2 text-sm border border-[#DDE1E7] rounded bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C8410A] focus:ring-1 focus:ring-[#C8410A]"

export default function CreateTest() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [timeLimit, setTimeLimit] = useState('30')
  const [passScore, setPassScore] = useState('70')
  const [attemptsAllowed, setAttemptsAllowed] = useState('3')
  const [questions, setQuestions] = useState<LocalQuestion[]>([])

  const addQuestion = () => setQuestions(prev => [...prev, {
    localId: Date.now().toString(), text: '', type: 'single', points: 1,
    answers: [
      { localId: `a1-${Date.now()}`, text: '', is_correct: false },
      { localId: `a2-${Date.now()}`, text: '', is_correct: false },
    ],
  }])

  const removeQuestion = (id: string) => setQuestions(prev => prev.filter(q => q.localId !== id))
  const updateQuestion = (id: string, field: string, value: string) => setQuestions(prev => prev.map(q => q.localId === id ? { ...q, [field]: value } : q))
  const addAnswer = (qId: string) => setQuestions(prev => prev.map(q => q.localId === qId ? { ...q, answers: [...q.answers, { localId: Date.now().toString(), text: '', is_correct: false }] } : q))
  const updateAnswer = (qId: string, aId: string, field: string, value: string | boolean) => setQuestions(prev => prev.map(q => q.localId === qId ? { ...q, answers: q.answers.map(a => a.localId === aId ? { ...a, [field]: value } : a) } : q))
  const toggleCorrect = (qId: string, aId: string, type: string) => setQuestions(prev => prev.map(q => q.localId === qId ? { ...q, answers: q.answers.map(a => ({ ...a, is_correct: (type === 'single' || type === 'truefalse') ? a.localId === aId : a.localId === aId ? !a.is_correct : a.is_correct })) } : q))

  return (
    <PageLayout>
      <div className="mb-8 pb-6 border-b border-[#DDE1E7]">
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Преподаватель</p>
        <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight">Создание теста</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#DDE1E7] rounded-lg p-5 sticky top-20">
            <h2 className="font-display font-semibold text-[#111827] text-sm mb-4 pb-3 border-b border-[#DDE1E7]">Параметры</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#4B5563] uppercase tracking-wider mb-1.5">Название</label>
                <input className={inputClass} placeholder="Название теста" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4B5563] uppercase tracking-wider mb-1.5">Предмет</label>
                <select className={inputClass} value={subjectId} onChange={e => setSubjectId(e.target.value)}>
                  <option value="">Выберите предмет</option>
                  {mockSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#4B5563] uppercase tracking-wider mb-1.5">Время (мин)</label>
                  <input type="number" className={inputClass} value={timeLimit} onChange={e => setTimeLimit(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#4B5563] uppercase tracking-wider mb-1.5">Порог (%)</label>
                  <input type="number" className={inputClass} value={passScore} onChange={e => setPassScore(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4B5563] uppercase tracking-wider mb-1.5">Попыток</label>
                <input type="number" className={inputClass} value={attemptsAllowed} onChange={e => setAttemptsAllowed(e.target.value)} />
              </div>
              <button onClick={() => { alert('Тест сохранён (демо)'); navigate('/teacher/dashboard') }} className="w-full py-2.5 bg-[#C8410A] text-white text-sm font-medium rounded hover:bg-[#A33508] transition-colors">
                Сохранить тест
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {questions.map((q, qi) => (
            <div key={q.localId} className="bg-white border border-[#DDE1E7] rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Вопрос {qi + 1}</span>
                <button onClick={() => removeQuestion(q.localId)} className="text-[#9CA3AF] hover:text-[#C8190A] transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <textarea
                placeholder="Текст вопроса..."
                value={q.text}
                onChange={e => updateQuestion(q.localId, 'text', e.target.value)}
                className={`${inputClass} min-h-[72px] resize-none mb-3`}
              />
              <div className="flex gap-3 mb-3">
                <select value={q.type} onChange={e => updateQuestion(q.localId, 'type', e.target.value)} className={inputClass}>
                  <option value="single">Один ответ</option>
                  <option value="multiple">Несколько ответов</option>
                  <option value="truefalse">Верно / Неверно</option>
                </select>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <label className="text-xs text-[#4B5563] whitespace-nowrap">Баллов:</label>
                  <input type="number" className={`${inputClass} w-16`} value={q.points} onChange={e => updateQuestion(q.localId, 'points', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                {q.answers.map(a => (
                  <div key={a.localId} className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCorrect(q.localId, a.localId, q.type)}
                      className={`w-5 h-5 flex-shrink-0 rounded border flex items-center justify-center transition-colors ${a.is_correct ? 'bg-[#1A7A4A] border-[#1A7A4A] text-white' : 'border-[#DDE1E7] hover:border-[#9CA3AF]'}`}
                    >
                      {a.is_correct && <Check className="h-3 w-3" />}
                    </button>
                    <input
                      className={inputClass}
                      placeholder="Вариант ответа"
                      value={a.text}
                      onChange={e => updateAnswer(q.localId, a.localId, 'text', e.target.value)}
                    />
                  </div>
                ))}
                {q.type !== 'truefalse' && (
                  <button onClick={() => addAnswer(q.localId)} className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#C8410A] transition-colors mt-1">
                    <Plus className="h-3 w-3" /> Добавить вариант
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="w-full py-3 border-2 border-dashed border-[#DDE1E7] rounded-lg text-sm text-[#9CA3AF] hover:border-[#C8410A] hover:text-[#C8410A] transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Добавить вопрос
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
