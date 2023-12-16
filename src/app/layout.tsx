import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
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
  rentmodal: React.ReactNode
  editmodal: React.ReactNode
}

export default async function RootLayout({ children, authmodal, rentmodal, editmodal }: RootLayoutProps) {

  return (
    <html lang="en">
      <AuthSessionProvider >
        <body className={nunito.className}>
          <Toaster />
          <Navbar />
          {children}
          {authmodal}
          {rentmodal}  
          {editmodal}         
        </body>
      </AuthSessionProvider>
    </html>
  )
}
