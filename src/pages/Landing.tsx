import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Nav */}
      <nav className="border-b border-[#DDE1E7] bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#C8410A] rounded flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" fill="white" opacity="0.9"/>
                <rect x="9" y="2" width="5" height="5" fill="white" opacity="0.6"/>
                <rect x="2" y="9" width="5" height="5" fill="white" opacity="0.6"/>
                <rect x="9" y="9" width="5" height="5" fill="white" opacity="0.3"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-semibold text-[#111827] text-sm tracking-tight">TestCenter</span>
              <span className="text-[10px] text-[#9CA3AF] tracking-wider uppercase">АВПК</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-3 py-1.5 text-sm text-[#4B5563] hover:text-[#111827] transition-colors">
              Войти
            </Link>
            <Link to="/register" className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium bg-[#C8410A] text-white rounded hover:bg-[#A33508] transition-colors">
              Начать <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 pt-20 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#C8410A] bg-[#FEF3EE] px-3 py-1.5 rounded-full mb-8 border border-[#C8410A]/20">
            <span className="w-1.5 h-1.5 bg-[#C8410A] rounded-full"></span>
            Актюбинский высший политехнический колледж
          </div>

          <h1 className="font-display font-bold text-[#111827] mb-6" style={{ fontSize: '3.25rem', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            Платформа<br />
            аттестации<br />
            <span className="text-[#C8410A]">знаний</span>
          </h1>

          <p className="text-[#4B5563] text-lg leading-relaxed mb-10 max-w-lg">
            Тесты с таймером, автоматические оценки, сертификаты. Для студентов, преподавателей и администрации колледжа.
          </p>

          <div className="flex items-center gap-3">
            <Link to="/login" className="flex items-center gap-2 px-5 py-2.5 bg-[#C8410A] text-white font-medium rounded hover:bg-[#A33508] transition-colors">
              Войти в систему <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/register" className="px-5 py-2.5 text-[#4B5563] font-medium border border-[#DDE1E7] rounded bg-white hover:bg-[#F0F2F5] transition-colors">
              Регистрация
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 pt-8 border-t border-[#DDE1E7] grid grid-cols-3 gap-0 max-w-lg">
          {[
            { value: '500+', label: 'Студентов в системе' },
            { value: '50+', label: 'Активных тестов' },
            { value: '1000+', label: 'Сертификатов выдано' },
          ].map((stat, i) => (
            <div key={i} className={`${i > 0 ? 'pl-8 border-l border-[#DDE1E7]' : ''} ${i < 2 ? 'pr-8' : ''}`}>
              <div className="font-mono font-bold text-2xl text-[#111827] tracking-tight">{stat.value}</div>
              <div className="text-xs text-[#9CA3AF] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[#DDE1E7] bg-white">
        <div className="max-w-6xl mx-auto px-5 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#DDE1E7]">
            {[
              {
                role: 'Студентам',
                items: [
                  'Прохождение тестов с обратным таймером',
                  'История всех попыток и оценок',
                  'Сертификаты при успешной аттестации',
                  'Навигация по вопросам',
                ],
              },
              {
                role: 'Преподавателям',
                items: [
                  'Конструктор тестов и вопросов',
                  'Назначение тестов группам',
                  'Сводная таблица результатов',
                  'Настройка порога и попыток',
                ],
              },
              {
                role: 'Администраторам',
                items: [
                  'Управление пользователями и ролями',
                  'Создание групп и специальностей',
                  'Аналитика по колледжу',
                  'Полный доступ к системе',
                ],
              },
            ].map((f) => (
              <div key={f.role} className="bg-white p-8">
                <p className="font-display font-semibold text-[#111827] mb-5">{f.role}</p>
                <ul className="space-y-3">
                  {f.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#4B5563]">
                      <CheckCircle2 className="h-4 w-4 text-[#1A7A4A] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111827]">
        <div className="max-w-6xl mx-auto px-5 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold text-white text-2xl tracking-tight mb-1">Готовы начать?</p>
            <p className="text-[#6B7280] text-sm">Вход для студентов, преподавателей и администраторов.</p>
          </div>
          <Link to="/login" className="flex items-center gap-2 px-6 py-3 bg-[#C8410A] text-white font-medium rounded hover:bg-[#A33508] transition-colors whitespace-nowrap">
            Войти в TestCenter <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#DDE1E7]">
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between">
          <span className="text-xs text-[#9CA3AF]">© 2026 TestCenter — Актюбинский высший политехнический колледж</span>
          <span className="text-xs text-[#9CA3AF] font-mono">v1.0.0</span>
        </div>
      </footer>
    </div>
  )
}
