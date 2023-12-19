import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import AuthSessionProvider from '@/providers/AuthSessionProvider'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'

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
  searchingmodal: React.ReactNode
}

export default async function RootLayout({ children, authmodal, rentmodal, editmodal, searchingmodal }: RootLayoutProps) {

  return (
    <html lang="en">
      <AuthSessionProvider >
        <body className={`${nunito.className} overflow-x-hidden min-h-[70vh]`}>
          <Toaster />
          <Navbar />
          {children}
          {authmodal}
          {rentmodal}
          {editmodal}
          {searchingmodal}
          <Footer/>
        </body>
      </AuthSessionProvider>
    </html>
  )
}
