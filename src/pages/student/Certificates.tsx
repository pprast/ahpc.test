// @ts-ignore
import { pdf } from '@react-pdf/renderer'
import PageLayout from '../../components/layout/PageLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { mockCertificates } from '../../lib/mockData'
import { formatDate, getGrade } from '../../lib/utils'
import { Award, Download, QrCode } from 'lucide-react'
import CertificatePDF from '../../components/certificate/CertificatePDF'
import { useAuthStore } from '../../store/authStore'
import type { Certificate } from '../../types'

export default function Certificates() {
  const user = useAuthStore(s => s.user)

  const handleDownload = async (cert: Certificate) => {
    const blob = await pdf(
      // @ts-ignore
      <CertificatePDF cert={cert} studentName={user?.full_name || 'Студент'} teacherName="Сейткали Г.А." />
    ).toBlob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `certificate-${cert.certificate_code}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Мои сертификаты</h1>
        <p className="text-slate-500 mt-1">Сертификаты об успешном прохождении аттестации</p>
      </div>
      {mockCertificates.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Award className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Сертификатов пока нет</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {mockCertificates.map(cert => (
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
                <Button className="w-full gap-2" variant="outline" onClick={() => handleDownload(cert)}>
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
