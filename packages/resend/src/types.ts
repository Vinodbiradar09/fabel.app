export interface EmailAttachment {
  filename: string
  content: string | Buffer
  contentType: string
  disposition?: 'attachment' | 'inline'
}

export interface ProcessedEmailData {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  senderEmail: string
  attachments?: EmailAttachment[]
  replyTo?: string
}

export interface SendEmailResult {
  success: boolean
  message: string
  data?: unknown
}

export interface BatchSendEmailResult {
  success: boolean
  message: string
  results: SendEmailResult[]
  data?: unknown
}

export interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  from?: string
  attachments?: EmailAttachment[]
  replyTo?: string
}
