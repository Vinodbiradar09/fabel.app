export type EmailType = 'transactional' | 'marketing'

export function getFromEmailAddress(_emailType: EmailType = 'transactional'): string {
  console.log(_emailType)
  return process.env.EMAIL_FROM ?? 'Fabel <fabel@vin0d.com>'
}
