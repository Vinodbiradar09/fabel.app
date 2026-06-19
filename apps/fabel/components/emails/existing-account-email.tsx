import type { CSSProperties } from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  render,
  Section,
  Text,
} from 'react-email'

interface ExistingAccountEmailProps {
  name: string
}

const APP_URL = process.env.BETTER_AUTH_URL ?? 'https://fabel.app'

export function ExistingAccountEmail({ name }: ExistingAccountEmailProps) {
  const greeting = name ? `Hi ${name},` : 'Hi there,'

  return (
    <Html lang='en'>
      <Head />
      <Preview>You already have a Fabel account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>You already have an account</Heading>

          <Text style={paragraph}>{greeting}</Text>
          <Text style={paragraph}>
            Someone just tried to create a Fabel account using this email address — but you already
            have one, so we didnt create a new account.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={`${APP_URL}/login`}>
              Sign in to Fabel
            </Button>
          </Section>

          <Text style={paragraph}>
            If this was you, just sign in above. If it wasnt, you can safely ignore this email —
            your account is secure and nothing has changed.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            You received this email because someone attempted to sign up with this address at{' '}
            <Link href={APP_URL} style={link}>
              Fabel
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export async function renderExistingAccountEmail(name: string): Promise<string> {
  return render(<ExistingAccountEmail name={name} />)
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
  margin: '0 0 16px',
}

const buttonContainer: CSSProperties = {
  margin: '24px 0',
}

const button: CSSProperties = {
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'none',
  padding: '12px 20px',
  borderRadius: '6px',
  display: 'inline-block',
}

const hr: CSSProperties = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
}

const footer: CSSProperties = {
  fontSize: '13px',
  lineHeight: '20px',
  color: '#6b7280',
  margin: 0,
}

const link: CSSProperties = {
  color: '#4f46e5',
  textDecoration: 'underline',
}
