import { createResendProvider } from './resend'
import type { BatchSendEmailResult, ProcessedEmailData, SendEmailResult } from './types'

export const sendEmail = async (options: ProcessedEmailData): Promise<SendEmailResult> => {
  try {
    return await dispatchWithFallBackRetries(options)
  } catch (error) {
    console.log(error)
    return { success: false, message: 'failed to send email' }
  }
}

const dispatchWithFallBackRetries = async (data: ProcessedEmailData): Promise<SendEmailResult> => {
  for (let i = 0; i < 3; i++) {
    try {
      const { send } = createResendProvider()
      return send(data)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    success: false,
    message: 'All retries are failed to send email',
  }
}

export const sendBatchEmail = async (
  options: ProcessedEmailData[]
): Promise<BatchSendEmailResult> => {
  try {
    const { sendBatch } = createResendProvider()
    return sendBatch(options)
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Failed to send batch emails', results: [] }
  }
}

export type {
  BatchSendEmailResult,
  EmailAttachment,
  EmailOptions,
  ProcessedEmailData,
  SendEmailResult,
} from './types'
