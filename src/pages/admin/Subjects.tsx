import { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { Textarea } from '../../components/ui/textarea'
import { mockSubjects } from '../../lib/mockData'
import type { Subject } from '../../types'
import { Plus, Pencil, Trash2, BookMarked } from 'lucide-react'

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Subject | null>(null)
  const [form, setForm] = useState({ name: '', description: '' })

  const handleSave = () => {
    if (editing) {
      setSubjects(prev => prev.map(s => s.id === editing.id ? { ...s, ...form } : s))
    } else {
      setSubjects(prev => [...prev, { id: Date.now().toString(), teacher_id: 'u2', ...form }])
    }
    setOpen(false)
    setForm({ name: '', description: '' })
    setEditing(null)
  }

  const handleEdit = (s: Subject) => {
    setEditing(s)
    setForm({ name: s.name, description: s.description || '' })
    setOpen(true)
  }

  const handleDelete = (id: string) => setSubjects(prev => prev.filter(s => s.id !== id))

  return (
    <PageLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Предметы</h1>
          <p className="text-slate-500 mt-1">Управление учебными дисциплинами</p>
        </div>
        <Dialog open={open} onOpenChange={o => { setOpen(o); if (!o) { setEditing(null); setForm({ name: '', description: '' }) } }}>
          <DialogTrigger asChild>
            <Button className="bg-[#1E40AF] hover:bg-[#1d3a9e] gap-2"><Plus className="h-4 w-4" /> Добавить предмет</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? 'Редактировать предмет' : 'Новый предмет'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label>Название</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Информационные системы" />
              </div>
              <div className="space-y-1.5">
                <Label>Описание</Label>
                <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Краткое описание предмета..." rows={3} />
              </div>
              <Button onClick={handleSave} className="w-full bg-[#1E40AF] hover:bg-[#1d3a9e]">Сохранить</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map(subject => (
          <Card key={subject.id} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-amber-50 text-amber-600 p-2.5 rounded-lg">
                  <BookMarked className="h-5 w-5" />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(subject)} className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(subject.id)} className="h-8 w-8 p-0 text-slate-400 hover:text-red-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <p className="font-semibold text-slate-900 text-lg">{subject.name}</p>
              {subject.description && <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{subject.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
