import { useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { Label } from '../../components/ui/label'
import { mockGroups } from '../../lib/mockData'
import type { Group } from '../../types'
import { Plus, Pencil, Trash2, Users } from 'lucide-react'

export default function AdminGroups() {
  const [groups, setGroups] = useState<Group[]>(mockGroups)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Group | null>(null)
  const [form, setForm] = useState({ name: '', specialty: '', year: new Date().getFullYear().toString() })

  const handleSave = () => {
    if (editing) {
      setGroups(prev => prev.map(g => g.id === editing.id ? { ...g, ...form, year: +form.year } : g))
    } else {
      setGroups(prev => [...prev, { id: Date.now().toString(), ...form, year: +form.year }])
    }
    setOpen(false)
    setForm({ name: '', specialty: '', year: new Date().getFullYear().toString() })
    setEditing(null)
  }

  const handleEdit = (g: Group) => {
    setEditing(g)
    setForm({ name: g.name, specialty: g.specialty, year: g.year.toString() })
    setOpen(true)
  }

  const handleDelete = (id: string) => setGroups(prev => prev.filter(g => g.id !== id))

  return (
    <PageLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Группы</h1>
          <p className="text-slate-500 mt-1">Управление учебными группами</p>
        </div>
        <Dialog open={open} onOpenChange={o => { setOpen(o); if (!o) { setEditing(null); setForm({ name: '', specialty: '', year: new Date().getFullYear().toString() }) } }}>
          <DialogTrigger asChild>
            <Button className="bg-[#1E40AF] hover:bg-[#1d3a9e] gap-2"><Plus className="h-4 w-4" /> Добавить группу</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? 'Редактировать группу' : 'Новая группа'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label>Название группы (напр. ИС-23)</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="ИС-23" />
              </div>
              <div className="space-y-1.5">
                <Label>Специальность</Label>
                <Input value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))} placeholder="Информационные системы" />
              </div>
              <div className="space-y-1.5">
                <Label>Год набора</Label>
                <Input type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} />
              </div>
              <Button onClick={handleSave} className="w-full bg-[#1E40AF] hover:bg-[#1d3a9e]">Сохранить</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(group => (
          <Card key={group.id} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-blue-50 text-[#1E40AF] p-2.5 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(group)} className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(group.id)} className="h-8 w-8 p-0 text-slate-400 hover:text-red-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <p className="font-bold text-2xl text-slate-900 font-mono">{group.name}</p>
              <p className="text-sm text-slate-500 mt-1">{group.specialty}</p>
              <Badge className="mt-3 bg-slate-100 text-slate-600 hover:bg-slate-100">Набор {group.year}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
