// import { GrainBackdrop } from '@/components/landing/grain-backdrop'

import type { Metadata } from 'next'
import { LoginCard } from '@/components/login-card'

export const metadata: Metadata = {
  title: 'Sign In | Invitely.gg',
  description: 'Sign in to Invitely to start sending event invitations',
}

export const dynamic = 'force-static'

export default function LoginPage() {
  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12'>
      {/*<GrainBackdrop />*/}

      <div className='relative w-full max-w-sm'>
        <div
          aria-hidden
          className='pointer-events-none absolute -inset-8 bg-linear-to-b from-white/5 to-transparent opacity-50 blur-2xl'
        />
        <div className='relative'>
          <LoginCard />
        </div>
      </div>
    </main>
  )
}
