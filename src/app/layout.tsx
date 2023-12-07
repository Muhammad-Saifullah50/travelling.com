import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import AuthSessionProvider from '@/providers/AuthSessionProvider'
import { Toaster } from 'react-hot-toast'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Travelling.com',
  description: 'Your next ultimate travel guide',
}

interface RootLayoutProps {
  children: React.ReactNode,
  authmodal: React.ReactNode
}

export default async function RootLayout({ children, authmodal }: RootLayoutProps) {

  return (
    <html lang="en">
      <AuthSessionProvider >
        <body className={nunito.className}>
          <Toaster/>
          <Navbar />
          {children}
          {authmodal}
        </body>
      </AuthSessionProvider>
    </html>
  )
}
