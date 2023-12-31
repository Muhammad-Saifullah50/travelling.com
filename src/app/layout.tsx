import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import AuthSessionProvider from '@/providers/AuthSessionProvider'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'


const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Travelling.com',
    default: 'Travelling.com',
  },
  description: 'Your next ultimate travel guide',
}

interface RootLayoutProps {
  children: React.ReactNode,
  authmodal: React.ReactNode
  rentmodal: React.ReactNode
  editmodal: React.ReactNode
  searchmodal: React.ReactNode
}

export default async function RootLayout({ children, authmodal, rentmodal, editmodal, searchmodal }: RootLayoutProps) {

  return (
    <html lang="en">
      <AuthSessionProvider >
        <body className={`${nunito.className} overflow-x-hidden min-h-[75vh]`}>
          <Toaster />
          <Navbar />
          {children}
          {authmodal}
          {rentmodal}
          {editmodal}
          {searchmodal}
          <Footer/>
        </body>
      </AuthSessionProvider>
    </html>
  )
}
