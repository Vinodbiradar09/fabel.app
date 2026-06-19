const SUBJECTS = {
  'existing-account': 'You already have a Fabel account',
  'verification-otp': 'Your Fabel verification code',
} as const

export type EmailSubjectKey = keyof typeof SUBJECTS

export function getEmailSubject(key: EmailSubjectKey): string {
  return SUBJECTS[key]
}
