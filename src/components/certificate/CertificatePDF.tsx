// @ts-ignore
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Certificate } from '../../types'
import { getGrade } from '../../lib/utils'

// @ts-ignore
const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    borderBottom: '2px solid #1E40AF',
    paddingBottom: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  collegeName: {
    fontSize: 10,
    color: '#1E40AF',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  collegeSubtitle: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 2,
  },
  certBadge: {
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'right',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 50,
  },
  body: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'baseline',
  },
  fieldLabel: {
    fontSize: 9,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    width: 100,
    fontFamily: 'Helvetica',
  },
  fieldValue: {
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Helvetica-Bold',
    flex: 1,
  },
  scoreBox: {
    backgroundColor: '#EFF6FF',
    border: '1px solid #BFDBFE',
    borderRadius: 8,
    padding: '16 24',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  scoreLabel: { fontSize: 9, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1 },
  scoreValue: { fontSize: 36, fontFamily: 'Helvetica-Bold', color: '#1E40AF' },
  gradeValue: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#1E40AF' },
  divider: { borderBottom: '1px solid #E5E7EB', marginBottom: 20 },
  footer: {
    borderTop: '1px solid #E5E7EB',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  codeLabel: { fontSize: 8, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  code: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#1E40AF' },
  signatureLabel: { fontSize: 8, color: '#9CA3AF', textAlign: 'right', textTransform: 'uppercase', letterSpacing: 1 },
  signatureLine: { borderTop: '1px solid #111827', width: 150, marginTop: 30, paddingTop: 6 },
  signatureName: { fontSize: 9, color: '#4B5563', textAlign: 'right' },
})

interface Props {
  cert: Certificate
  studentName: string
  teacherName?: string
}

export default function CertificatePDF({ cert, studentName, teacherName }: Props) {
  const score = cert.attempt?.score ?? 0
  const issueDate = new Date(cert.issued_at).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    // @ts-ignore
    <Document>
      {/* @ts-ignore */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        {/* @ts-ignore */}
        <View style={styles.header}>
          {/* @ts-ignore */}
          <View>
            {/* @ts-ignore */}
            <Text style={styles.collegeName}>Актюбинский высший политехнический колледж</Text>
            {/* @ts-ignore */}
            <Text style={styles.collegeSubtitle}>Ақтөбе жоғары политехникалық колледжі</Text>
          </View>
          {/* @ts-ignore */}
          <Text style={styles.certBadge}>TestCenter</Text>
        </View>

        {/* Title */}
        {/* @ts-ignore */}
        <Text style={styles.title}>СЕРТИФИКАТ</Text>
        {/* @ts-ignore */}
        <Text style={styles.subtitle}>об успешном прохождении аттестации</Text>

        {/* Fields */}
        {/* @ts-ignore */}
        <View style={styles.body}>
          {/* @ts-ignore */}
          <View style={styles.fieldRow}>
            {/* @ts-ignore */}
            <Text style={styles.fieldLabel}>Выдан</Text>
            {/* @ts-ignore */}
            <Text style={styles.fieldValue}>{studentName}</Text>
          </View>
          {/* @ts-ignore */}
          <View style={styles.fieldRow}>
            {/* @ts-ignore */}
            <Text style={styles.fieldLabel}>Предмет</Text>
            {/* @ts-ignore */}
            <Text style={styles.fieldValue}>{cert.test?.subject?.name || '—'}</Text>
          </View>
          {/* @ts-ignore */}
          <View style={styles.fieldRow}>
            {/* @ts-ignore */}
            <Text style={styles.fieldLabel}>Тест</Text>
            {/* @ts-ignore */}
            <Text style={styles.fieldValue}>{cert.test?.title || '—'}</Text>
          </View>
          {/* @ts-ignore */}
          <View style={styles.fieldRow}>
            {/* @ts-ignore */}
            <Text style={styles.fieldLabel}>Дата</Text>
            {/* @ts-ignore */}
            <Text style={styles.fieldValue}>{issueDate}</Text>
          </View>

          {/* Score box */}
          {/* @ts-ignore */}
          <View style={styles.scoreBox}>
            {/* @ts-ignore */}
            <View>
              {/* @ts-ignore */}
              <Text style={styles.scoreLabel}>Результат</Text>
              {/* @ts-ignore */}
              <Text style={styles.scoreValue}>{score}%</Text>
            </View>
            {/* @ts-ignore */}
            <View>
              {/* @ts-ignore */}
              <Text style={styles.scoreLabel}>Оценка</Text>
              {/* @ts-ignore */}
              <Text style={styles.gradeValue}>{getGrade(score)}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        {/* @ts-ignore */}
        <View style={styles.footer}>
          {/* @ts-ignore */}
          <View>
            {/* @ts-ignore */}
            <Text style={styles.codeLabel}>Код верификации</Text>
            {/* @ts-ignore */}
            <Text style={styles.code}>{cert.certificate_code}</Text>
          </View>
          {/* @ts-ignore */}
          <View style={{ alignItems: 'flex-end' }}>
            {/* @ts-ignore */}
            <Text style={styles.signatureLine}> </Text>
            {/* @ts-ignore */}
            <Text style={styles.signatureName}>{teacherName || 'Преподаватель'}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
