import type { CSSProperties } from 'react'
import { Body, Container, Head, Heading, Html, Preview, render, Section, Text } from 'react-email'

interface VerificationOtpEmailProps {
  otp: string
}

export function VerificationOtpEmail({ otp }: VerificationOtpEmailProps) {
  return (
    <Html lang='en'>
      <Head />
      <Preview>Your Fabel verification code</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Verify your email</Heading>

          <Text style={paragraph}>Enter this code to finish creating your Fabel account:</Text>

          <Section style={codeBox}>
            <Text style={code}>{otp}</Text>
          </Section>

          <Text style={footer}>
            This code expires shortly. If you didnt request it, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export async function renderVerificationOtpEmail(otp: string): Promise<string> {
  return render(<VerificationOtpEmail otp={otp} />)
}

const main: CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
}

const container: CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '32px',
  maxWidth: '480px',
  borderRadius: '8px',
  textAlign: 'center',
}

const heading: CSSProperties = {
  fontSize: '20px',
  fontWeight: 700,
  color: '#111827',
  margin: '0 0 16px',
}

const paragraph: CSSProperties = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0 0 24px',
}

const codeBox: CSSProperties = {
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  padding: '16px',
  margin: '0 0 24px',
}

const code: CSSProperties = {
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '8px',
  color: '#111827',
  margin: 0,
  fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
}

const footer: CSSProperties = {
  fontSize: '13px',
  lineHeight: '20px',
  color: '#6b7280',
  margin: 0,
}
