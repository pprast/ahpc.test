import { Link } from 'react-router-dom'
import type { Test } from '../../types'
import { Clock, ArrowRight } from 'lucide-react'

interface TestCardProps {
  test: Test
  attemptCount?: number
  lastScore?: number
  linkPrefix?: string
}

export default function TestCard({ test, attemptCount = 0, lastScore, linkPrefix = '/student' }: TestCardProps) {
  const attemptsLeft = test.attempts_allowed - attemptCount
  const canTake = attemptsLeft > 0 && test.is_active

  return (
    <div className="bg-white border border-[#DDE1E7] rounded-lg p-5 hover:border-[#C8410A] hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-[#111827] text-base leading-snug group-hover:text-[#C8410A] transition-colors">
            {test.title}
          </h3>
          {test.subject && (
            <p className="text-sm text-[#9CA3AF] mt-0.5">{test.subject.name}</p>
          )}
        </div>
        {lastScore !== undefined && (
          <span className={`font-mono text-lg font-bold flex-shrink-0 ${
            lastScore >= test.pass_score ? 'text-[#1A7A4A]' : 'text-[#C8190A]'
          }`}>
            {lastScore}%
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-xs text-[#9CA3AF] mb-4">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {test.time_limit} мин
        </span>
        <span>Порог {test.pass_score}%</span>
        <span>{attemptsLeft} из {test.attempts_allowed} попыток</span>
      </div>

      {canTake ? (
        <Link
          to={`${linkPrefix}/test/${test.id}`}
          className="flex items-center justify-between w-full px-4 py-2.5 bg-[#C8410A] text-white text-sm font-medium rounded hover:bg-[#A33508] transition-colors group/btn"
        >
          <span>Начать тест</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      ) : (
        <div className="w-full px-4 py-2.5 bg-[#F0F2F5] text-[#9CA3AF] text-sm text-center rounded cursor-not-allowed">
          {attemptsLeft === 0 ? 'Попытки исчерпаны' : 'Недоступен'}
        </div>
      )}
    </div>
  )
}
