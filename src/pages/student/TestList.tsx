import { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import TestCard from '../../components/test/TestCard'
import { mockTests, mockSubjects } from '../../lib/mockData'
import { Search } from 'lucide-react'

export default function TestList() {
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('all')

  const filtered = mockTests.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) &&
    (subjectFilter === 'all' || t.subject_id === subjectFilter)
  )

  return (
    <PageLayout>
      <div className="mb-8 pb-6 border-b border-[#DDE1E7]">
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Студент</p>
        <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight">Доступные тесты</h1>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#DDE1E7] rounded bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C8410A] focus:ring-1 focus:ring-[#C8410A]"
          />
        </div>
        <select
          value={subjectFilter}
          onChange={e => setSubjectFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-[#DDE1E7] rounded bg-white text-[#111827] focus:outline-none focus:border-[#C8410A] focus:ring-1 focus:ring-[#C8410A]"
        >
          <option value="all">Все предметы</option>
          {mockSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#9CA3AF]">
          <p>Тесты не найдены</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(test => <TestCard key={test.id} test={test} attemptCount={0} />)}
        </div>
      )}
    </PageLayout>
  )
}
