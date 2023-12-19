import AuthModal from '@/components/modals/AuthModal'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
}
const RegisterModal = () => {
  return (
    <AuthModal  /> 
  )
}

export default RegisterModal
