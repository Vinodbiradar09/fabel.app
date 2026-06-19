import { Resend } from 'resend'
import type { BatchSendEmailResult, ProcessedEmailData, SendEmailResult } from './types'
import { toResendPayload } from './util'

export function createResendProvider() {
  const resend = new Resend(process.env.RESEND_API_KEY!)
  return {
    async send(data: ProcessedEmailData): Promise<SendEmailResult> {
      const payload = toResendPayload(data)
      const { data: resendData, error } = await resend.emails.send(payload as never)
      if (error) {
        throw new Error(error.message || 'Failed to send email via resend')
      }
      return {
        success: true,
        message: 'Email sent successfully via resend',
        data: resendData,
      }
    },
    async sendBatch(emails: ProcessedEmailData[]): Promise<BatchSendEmailResult> {
      const payloads = emails.map(toResendPayload)
      const response = await resend.batch.send(payloads as never)
      if (response.error) {
        throw new Error(response.error.message || 'resend batch emails failed')
      }

      const results: SendEmailResult[] = emails.map((_, index) => ({
        success: true,
        message: 'Email sent successfully via resend batch',
        data: { id: `batch-${index}` },
      }))

      return {
        success: true,
        message: 'All batch emails sent successfully via resend',
        results,
        data: {
          count: emails.length,
        },
      }
    },
  }
}
