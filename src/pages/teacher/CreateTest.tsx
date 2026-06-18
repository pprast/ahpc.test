import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../../components/layout/PageLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { Badge } from '../../components/ui/badge'
import { mockSubjects } from '../../lib/mockData'
import { Plus, Trash2, CheckCircle } from 'lucide-react'

interface LocalAnswer { localId: string; text: string; is_correct: boolean }
interface LocalQuestion { localId: string; text: string; type: string; points: number; answers: LocalAnswer[] }

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
    answers: [{ localId: `a1-${Date.now()}`, text: '', is_correct: false }, { localId: `a2-${Date.now()}`, text: '', is_correct: false }],
  }])

  const removeQuestion = (id: string) => setQuestions(prev => prev.filter(q => q.localId !== id))

  const updateQuestion = (id: string, field: string, value: string) =>
    setQuestions(prev => prev.map(q => q.localId === id ? { ...q, [field]: value } : q))

  const addAnswer = (qId: string) => setQuestions(prev => prev.map(q =>
    q.localId === qId ? { ...q, answers: [...q.answers, { localId: Date.now().toString(), text: '', is_correct: false }] } : q
  ))

  const updateAnswer = (qId: string, aId: string, field: string, value: string | boolean) =>
    setQuestions(prev => prev.map(q =>
      q.localId === qId ? { ...q, answers: q.answers.map(a => a.localId === aId ? { ...a, [field]: value } : a) } : q
    ))

  const toggleCorrect = (qId: string, aId: string, type: string) =>
    setQuestions(prev => prev.map(q =>
      q.localId === qId ? {
        ...q,
        answers: q.answers.map(a => ({
          ...a,
          is_correct: (type === 'single' || type === 'truefalse') ? a.localId === aId : a.localId === aId ? !a.is_correct : a.is_correct,
        })),
      } : q
    ))

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Создание теста</h1>
        <p className="text-slate-500 mt-1">Заполните параметры и добавьте вопросы</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm sticky top-20">
            <CardHeader><CardTitle className="text-base">Параметры теста</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5"><Label>Название теста</Label><Input placeholder="Введите название" value={title} onChange={e => setTitle(e.target.value)} /></div>
              <div className="space-y-1.5">
                <Label>Предмет</Label>
                <Select value={subjectId} onValueChange={setSubjectId}>
                  <SelectTrigger><SelectValue placeholder="Выберите предмет" /></SelectTrigger>
                  <SelectContent>{mockSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Время (мин)</Label><Input type="number" value={timeLimit} onChange={e => setTimeLimit(e.target.value)} /></div>
                <div className="space-y-1.5"><Label>Порог (%)</Label><Input type="number" value={passScore} onChange={e => setPassScore(e.target.value)} /></div>
              </div>
              <div className="space-y-1.5"><Label>Попыток</Label><Input type="number" value={attemptsAllowed} onChange={e => setAttemptsAllowed(e.target.value)} /></div>
              <Button onClick={() => { alert('Тест сохранён (демо)'); navigate('/teacher/dashboard') }} className="w-full bg-[#1E40AF] hover:bg-[#1d3a9e]">Сохранить тест</Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-4">
          {questions.map((q, qi) => (
            <Card key={q.localId} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-[#1E40AF] text-white">Вопрос {qi + 1}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => removeQuestion(q.localId)} className="text-red-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                </div>
                <Textarea placeholder="Текст вопроса..." value={q.text} onChange={e => updateQuestion(q.localId, 'text', e.target.value)} className="mb-3" />
                <div className="flex gap-3 mb-4">
                  <Select value={q.type} onValueChange={v => updateQuestion(q.localId, 'type', v)}>
                    <SelectTrigger className="flex-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Один ответ</SelectItem>
                      <SelectItem value="multiple">Несколько ответов</SelectItem>
                      <SelectItem value="truefalse">Верно/Неверно</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs whitespace-nowrap">Баллы:</Label>
                    <Input type="number" className="w-16" value={q.points} onChange={e => updateQuestion(q.localId, 'points', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  {q.answers.map(a => (
                    <div key={a.localId} className="flex items-center gap-2">
                      <button onClick={() => toggleCorrect(q.localId, a.localId, q.type)} className={`flex-shrink-0 transition-colors ${a.is_correct ? 'text-emerald-600' : 'text-slate-300 hover:text-slate-400'}`}>
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <Input placeholder="Вариант ответа" value={a.text} onChange={e => updateAnswer(q.localId, a.localId, 'text', e.target.value)} />
                    </div>
                  ))}
                  {q.type !== 'truefalse' && (
                    <Button variant="ghost" size="sm" onClick={() => addAnswer(q.localId)} className="text-[#1E40AF] gap-1"><Plus className="h-3.5 w-3.5" /> Добавить вариант</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addQuestion} variant="outline" className="w-full gap-2 border-dashed border-[#1E40AF] text-[#1E40AF]">
            <Plus className="h-4 w-4" /> Добавить вопрос
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
