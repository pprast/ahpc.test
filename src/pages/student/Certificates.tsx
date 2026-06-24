import PageLayout from '../../components/layout/PageLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { useCertificates } from '../../hooks/useCertificates'
import { formatDate, getGrade } from '../../lib/utils'
import { Award, Download, QrCode } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import type { Certificate } from '../../types'

function printCertificate(cert: Certificate, studentName: string, teacherName = 'Преподаватель') {
  const score = cert.attempt?.score ?? 0
  const issueDate = new Date(cert.issued_at).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const win = window.open('', '_blank', 'width=1200,height=800')
  if (!win) return

  win.document.write(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Сертификат ${cert.certificate_code}</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Roboto', Arial, sans-serif; background: #fff; }
    @media print {
      @page { size: A4 landscape; margin: 0; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    .page {
      width: 297mm; height: 210mm;
      padding: 14mm 18mm;
      display: flex; flex-direction: column;
      position: relative; overflow: hidden;
    }
    .corner {
      position: absolute; width: 40mm; height: 40mm;
      background: #1E40AF; opacity: 0.08;
    }
    .corner-tl { top: 0; left: 0; border-radius: 0 0 100% 0; }
    .corner-br { bottom: 0; right: 0; border-radius: 100% 0 0 0; }
    .header {
      display: flex; justify-content: space-between; align-items: flex-end;
      border-bottom: 2px solid #1E40AF; padding-bottom: 6mm; margin-bottom: 8mm;
    }
    .college-name { font-size: 10pt; color: #1E40AF; font-weight: 700; letter-spacing: 0.5px; }
    .college-kz { font-size: 8pt; color: #6B7280; margin-top: 2px; }
    .badge { font-size: 8pt; color: #6B7280; text-align: right; }
    .title { font-size: 30pt; font-weight: 900; color: #111827; text-align: center; letter-spacing: -1px; }
    .subtitle { font-size: 11pt; color: #6B7280; text-align: center; margin-top: 3mm; margin-bottom: 8mm; }
    .body { flex: 1; display: flex; flex-direction: column; justify-content: center; }
    .field { display: flex; align-items: baseline; margin-bottom: 5mm; }
    .field-label { font-size: 8pt; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px; width: 26mm; flex-shrink: 0; }
    .field-value { font-size: 13pt; color: #111827; font-weight: 700; }
    .score-box {
      background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 6px;
      padding: 5mm 8mm; display: flex; justify-content: space-between; align-items: center;
      margin-top: 6mm;
    }
    .score-label { font-size: 8pt; color: #6B7280; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
    .score-value { font-size: 32pt; font-weight: 900; color: #1E40AF; }
    .grade-value { font-size: 16pt; font-weight: 700; color: #1E40AF; }
    .footer {
      border-top: 1px solid #E5E7EB; padding-top: 5mm;
      display: flex; justify-content: space-between; align-items: flex-end;
    }
    .code-label { font-size: 7pt; color: #9CA3AF; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
    .code { font-size: 10pt; font-weight: 700; color: #1E40AF; }
    .sig-line { border-top: 1px solid #111827; width: 50mm; padding-top: 3mm; margin-top: 8mm; text-align: right; }
    .sig-name { font-size: 9pt; color: #4B5563; }
  </style>
</head>
<body>
<div class="page">
  <div class="corner corner-tl"></div>
  <div class="corner corner-br"></div>
  <div class="header">
    <div>
      <div class="college-name">Актюбинский высший политехнический колледж</div>
      <div class="college-kz">Ақтөбе жоғары политехникалық колледжі</div>
    </div>
    <div class="badge">TestCenter</div>
  </div>
  <div class="title">СЕРТИФИКАТ</div>
  <div class="subtitle">об успешном прохождении аттестации</div>
  <div class="body">
    <div class="field">
      <span class="field-label">Выдан</span>
      <span class="field-value">${studentName}</span>
    </div>
    <div class="field">
      <span class="field-label">Предмет</span>
      <span class="field-value">${cert.test?.subject?.name || '—'}</span>
    </div>
    <div class="field">
      <span class="field-label">Тест</span>
      <span class="field-value">${cert.test?.title || '—'}</span>
    </div>
    <div class="field">
      <span class="field-label">Дата</span>
      <span class="field-value">${issueDate}</span>
    </div>
    <div class="score-box">
      <div>
        <div class="score-label">Результат</div>
        <div class="score-value">${score}%</div>
      </div>
      <div style="text-align:right">
        <div class="score-label">Оценка</div>
        <div class="grade-value">${getGrade(score)}</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div>
      <div class="code-label">Код верификации</div>
      <div class="code">${cert.certificate_code}</div>
    </div>
    <div class="sig-line">
      <div class="sig-name">${teacherName}</div>
    </div>
  </div>
</div>
<script>window.onload = () => { window.focus(); window.print(); }</script>
</body>
</html>`)
  win.document.close()
}

export default function Certificates() {
  const user = useAuthStore(s => s.user)
  const { certificates, loading } = useCertificates()

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Мои сертификаты</h1>
        <p className="text-slate-500 mt-1">Сертификаты об успешном прохождении аттестации</p>
      </div>
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map(i => <div key={i} className="animate-pulse bg-slate-200 h-56 rounded-xl" />)}
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Award className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Сертификатов пока нет</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map(cert => (
            <Card key={cert.id} className="border-0 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-[#1E40AF] to-blue-700 p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-8 w-8 text-[#F59E0B]" />
                  <div>
                    <p className="font-bold text-lg">Сертификат</p>
                    <p className="text-blue-200 text-xs">об успешном прохождении аттестации</p>
                  </div>
                </div>
                <h3 className="font-semibold text-base">{cert.test?.title}</h3>
                <p className="text-blue-200 text-sm mt-1">{cert.test?.subject?.name}</p>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className={`text-2xl font-bold ${cert.attempt && cert.attempt.score >= 90 ? 'text-emerald-600' : 'text-blue-600'}`}>{cert.attempt?.score}%</div>
                    <div className="text-sm text-slate-500">{cert.attempt ? getGrade(cert.attempt.score) : ''}</div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 gap-1">
                    <QrCode className="h-3 w-3" /> {cert.certificate_code}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mb-4">Выдан: {formatDate(cert.issued_at)}</p>
                <Button
                  className="w-full gap-2" variant="outline"
                  onClick={() => printCertificate(cert, user?.full_name || 'Студент')}
                >
                  <Download className="h-4 w-4" /> Скачать PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
