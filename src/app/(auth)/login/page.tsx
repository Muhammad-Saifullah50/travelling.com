import AuthModal from '@/components/modals/AuthModal'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
}
const LoginPage = () => {
  return (
    <AuthModal />
  )
}

export default LoginPage
