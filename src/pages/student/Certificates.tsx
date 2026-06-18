import PageLayout from '../../components/layout/PageLayout'
import { mockCertificates } from '../../lib/mockData'
import { formatDate, getGrade } from '../../lib/utils'
import { Download } from 'lucide-react'

export default function Certificates() {
  return (
    <PageLayout>
      <div className="mb-8 pb-6 border-b border-[#DDE1E7]">
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-1">Студент</p>
        <h1 className="font-display font-bold text-[#111827] text-2xl tracking-tight">Сертификаты</h1>
      </div>

      {mockCertificates.length === 0 ? (
        <div className="text-center py-20 text-[#9CA3AF]">
          <p className="text-base">Сертификатов пока нет</p>
          <p className="text-sm mt-1">Успешно пройдите тест, чтобы получить сертификат</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {mockCertificates.map(cert => (
            <div key={cert.id} className="bg-white border border-[#DDE1E7] rounded-lg overflow-hidden">
              {/* Certificate header */}
              <div className="bg-[#111827] px-6 py-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-1">Сертификат</p>
                    <p className="font-display font-semibold text-white text-base leading-snug">{cert.test?.title}</p>
                    <p className="text-[#6B7280] text-xs mt-1">{cert.test?.subject?.name}</p>
                  </div>
                  <span className={`font-mono font-bold text-2xl ${cert.attempt && cert.attempt.score >= 90 ? 'text-[#C8410A]' : 'text-[#9CA3AF]'}`}>
                    {cert.attempt?.score}%
                  </span>
                </div>
              </div>

              {/* Certificate body */}
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Оценка</p>
                    <p className="text-sm font-medium text-[#111827]">{cert.attempt ? getGrade(cert.attempt.score) : '—'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#9CA3AF]">Выдан</p>
                    <p className="text-sm text-[#111827]">{formatDate(cert.issued_at)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#DDE1E7]">
                  <span className="font-mono text-xs text-[#9CA3AF]">{cert.certificate_code}</span>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-[#C8410A] hover:underline">
                    <Download className="h-3.5 w-3.5" /> Скачать PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
