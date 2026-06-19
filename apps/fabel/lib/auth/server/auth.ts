import { sharedAuthOptions } from '@fabel/betterauth'
import { sendEmail } from '@fabel/resend'
import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { emailOTP } from 'better-auth/plugins'
import { renderExistingAccountEmail } from '@/components/emails/existing-account-email'
import { renderVerificationOtpEmail } from '@/components/emails/verification-otp-email'
import { getFromEmailAddress } from '@/lib/email/from'
import { getEmailSubject } from '@/lib/email/subjects'

export const auth = betterAuth({
  ...sharedAuthOptions,
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // Fired when someone tries to sign up with an email that already exists.
    onExistingUserSignUp: async ({ user }) => {
      const html = await renderExistingAccountEmail(user.name || '')
      const result = await sendEmail({
        to: user.email,
        subject: getEmailSubject('existing-account'),
        html,
        senderEmail: getFromEmailAddress('transactional'),
      })
      if (!result.success) {
        console.warn(
          '[onExistingUserSignUp] failed to send existing-account email:',
          result.message
        )
      }
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        const html = await renderVerificationOtpEmail(otp)
        await sendEmail({
          to: email,
          subject: getEmailSubject('verification-otp'),
          html,
          senderEmail: getFromEmailAddress('transactional'),
        })
      },
    }),
    nextCookies(),
  ],
})

export type { Session, User } from '@fabel/betterauth'
