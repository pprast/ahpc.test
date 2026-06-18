import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Clock, Target, BookOpen, ChevronRight } from 'lucide-react'
import type { Test } from '../../types'

interface TestCardProps {
  test: Test
  attemptCount?: number
  lastScore?: number
  linkPrefix?: string
}

export default function TestCard({ test, attemptCount = 0, lastScore, linkPrefix = '/student' }: TestCardProps) {
  const attemptsLeft = test.attempts_allowed - attemptCount
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge className={test.is_active ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-slate-100 text-slate-500'}>
            {test.is_active ? 'Активный' : 'Неактивный'}
          </Badge>
          {lastScore !== undefined && (
            <Badge className={lastScore >= test.pass_score ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : 'bg-red-100 text-red-700 hover:bg-red-100'}>
              {lastScore}%
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-[#1E40AF] transition-colors">{test.title}</h3>
        {test.subject && <p className="text-sm text-slate-500 mt-1">{test.subject.name}</p>}
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {test.time_limit} мин</span>
          <span className="flex items-center gap-1"><Target className="h-3.5 w-3.5" /> Порог: {test.pass_score}%</span>
          <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> Попыток: {attemptsLeft}/{test.attempts_allowed}</span>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        {attemptsLeft > 0 ? (
          <Button asChild className="w-full bg-[#1E40AF] hover:bg-[#1d3a9e]">
            <Link to={`${linkPrefix}/test/${test.id}`}>Начать тест <ChevronRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        ) : (
          <Button disabled className="w-full">Попытки исчерпаны</Button>
        )}
      </CardFooter>
    </Card>
  )
}
