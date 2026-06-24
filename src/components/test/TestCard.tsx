import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Clock, Target, RotateCcw, ChevronRight, CheckCircle2, BookOpen } from 'lucide-react'
import type { Test } from '../../types'

interface TestCardProps {
  test: Test
  attemptCount?: number
  lastScore?: number
  linkPrefix?: string
}

export default function TestCard({ test, attemptCount = 0, lastScore, linkPrefix = '/student' }: TestCardProps) {
  const attemptsLeft = test.attempts_allowed - attemptCount
  const passed = lastScore !== undefined && lastScore >= test.pass_score

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full border border-slate-100 group overflow-hidden">
      {/* Accent bar */}
      <div className={`h-1.5 w-full ${test.is_active ? 'bg-gradient-to-r from-[#1E40AF] to-blue-400' : 'bg-slate-200'}`} />

      <div className="flex flex-col flex-1 p-5">
        {/* Subject + status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 truncate">
            <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{test.subject?.name || 'Без предмета'}</span>
          </span>
          {lastScore !== undefined ? (
            <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
              {lastScore}%
            </span>
          ) : (
            <span className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${test.is_active ? 'bg-blue-50 text-[#1E40AF]' : 'bg-slate-100 text-slate-400'}`}>
              {test.is_active ? 'Активный' : 'Неактивный'}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 text-[15px] leading-snug group-hover:text-[#1E40AF] transition-colors line-clamp-2 flex-1 mb-4">
          {test.title}
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-slate-50 rounded-xl p-2.5 text-center">
            <Clock className="h-4 w-4 text-slate-400 mx-auto mb-1" />
            <p className="text-xs font-semibold text-slate-700">{test.time_limit}</p>
            <p className="text-[10px] text-slate-400">мин</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5 text-center">
            <Target className="h-4 w-4 text-slate-400 mx-auto mb-1" />
            <p className="text-xs font-semibold text-slate-700">{test.pass_score}%</p>
            <p className="text-[10px] text-slate-400">порог</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5 text-center">
            <RotateCcw className="h-4 w-4 text-slate-400 mx-auto mb-1" />
            <p className="text-xs font-semibold text-slate-700">{attemptsLeft}/{test.attempts_allowed}</p>
            <p className="text-[10px] text-slate-400">попыток</p>
          </div>
        </div>

        {/* Button */}
        {attemptsLeft > 0 ? (
          <Button asChild className="w-full bg-[#1E40AF] hover:bg-[#1d3a9e] gap-2 mt-auto">
            <Link to={`${linkPrefix}/test/${test.id}`}>
              {passed ? <CheckCircle2 className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              {passed ? 'Пройти снова' : 'Начать тест'}
            </Link>
          </Button>
        ) : (
          <Button disabled className="w-full mt-auto text-slate-400 bg-slate-100 hover:bg-slate-100 cursor-not-allowed">
            Попытки исчерпаны
          </Button>
        )}
      </div>
    </div>
  )
}
