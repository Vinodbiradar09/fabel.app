import type { ProcessedEmailData } from './types'
export function toResendPayload(data: ProcessedEmailData) {
  return {
    from: data.senderEmail,
    to: data.to,
    subject: data.subject,
    html: data.html,
    text: data.text,
    attachments: data.attachments?.map((att) => ({
      fileName: att.filename,
      content: typeof att.content === 'string' ? att.content : att.content.toString('base64'),
      contentType: att.contentType,
      disposition: att.disposition || 'attachment',
    })),
  }
}
