import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { GraduationCap, BookOpen, Users, Shield, CheckCircle, Award, Clock, BarChart3 } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-[#1E40AF] rounded-lg p-1.5"><GraduationCap className="h-6 w-6 text-white" /></div>
            <div>
              <div className="font-bold text-[#1E40AF] text-sm">TestCenter</div>
              <div className="text-xs text-slate-400">АВПК</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild><Link to="/login">Войти</Link></Button>
            <Button className="bg-[#1E40AF] hover:bg-[#1d3a9e]" asChild><Link to="/register">Начать</Link></Button>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-[#1E40AF] via-blue-700 to-blue-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur">
            <Award className="h-4 w-4 text-[#F59E0B]" /> Актюбинский высший политехнический колледж
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
            Платформа<br/><span className="text-[#F59E0B]">тестирования</span> знаний
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Современная система аттестации для студентов и преподавателей. Тесты, результаты, сертификаты — всё в одном месте.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-[#F59E0B] hover:bg-amber-500 text-white font-semibold px-8" asChild>
              <Link to="/login">Начать тестирование</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-[#1E40AF]" asChild>
              <Link to="/register">Регистрация</Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            {[{ value: '500+', label: 'Студентов' }, { value: '50+', label: 'Тестов' }, { value: '1000+', label: 'Сертификатов' }].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-[#F59E0B]">{s.value}</div>
                <div className="text-sm text-blue-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Возможности платформы</h2>
            <p className="text-slate-500 mt-3">Всё необходимое для качественного обучения и оценки знаний</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <BookOpen className="h-7 w-7" />, title: 'Для студентов', color: 'text-blue-600 bg-blue-50', items: ['Прохождение тестов с таймером', 'История результатов', 'Сертификаты об аттестации', 'Удобный интерфейс'] },
              { icon: <Users className="h-7 w-7" />, title: 'Для преподавателей', color: 'text-amber-600 bg-amber-50', items: ['Создание тестов и вопросов', 'Назначение группам', 'Аналитика результатов', 'Экспорт в CSV'] },
              { icon: <Shield className="h-7 w-7" />, title: 'Для администраторов', color: 'text-emerald-600 bg-emerald-50', items: ['Управление пользователями', 'Управление группами', 'Сводная статистика', 'Настройка системы'] },
            ].map(f => (
              <Card key={f.title} className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className={`inline-flex p-3 rounded-xl ${f.color} mb-5`}>{f.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{f.title}</h3>
                  <ul className="space-y-2.5">
                    {f.items.map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-slate-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Как это работает</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: <Users className="h-8 w-8" />, step: '1', title: 'Регистрация', desc: 'Создайте аккаунт студента или войдите по данным колледжа' },
              { icon: <Clock className="h-8 w-8" />, step: '2', title: 'Пройдите тест', desc: 'Ответьте на вопросы в отведённое время с комфортным интерфейсом' },
              { icon: <BarChart3 className="h-8 w-8" />, step: '3', title: 'Получите результат', desc: 'Узнайте оценку и скачайте сертификат при успешном прохождении' },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="bg-[#1E40AF] text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold">{s.step}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#1E40AF] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-blue-100 mb-8">Присоединяйтесь к тысячам студентов и преподавателей АВПК</p>
          <Button size="lg" className="bg-[#F59E0B] hover:bg-amber-500 text-white font-semibold px-10" asChild>
            <Link to="/register">Зарегистрироваться бесплатно</Link>
          </Button>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-slate-100 text-center text-sm text-slate-400">
        <div className="flex items-center justify-center gap-2 mb-2">
          <GraduationCap className="h-4 w-4 text-[#1E40AF]" />
          <span className="font-medium text-slate-600">Актюбинский высший политехнический колледж</span>
        </div>
        <p>© 2026 TestCenter. Платформа тестирования знаний.</p>
      </footer>
    </div>
  )
}
