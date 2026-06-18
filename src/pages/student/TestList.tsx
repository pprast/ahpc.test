import { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import TestCard from '../../components/test/TestCard'
import { mockTests, mockSubjects } from '../../lib/mockData'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Доступные тесты</h1>
        <p className="text-slate-500 mt-1">Выберите тест для прохождения</p>
      </div>
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Поиск по названию..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Предмет" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все предметы</SelectItem>
            {mockSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>Тесты не найдены</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(test => <TestCard key={test.id} test={test} attemptCount={0} />)}
        </div>
      )}
    </PageLayout>
  )
}
