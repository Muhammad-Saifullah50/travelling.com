'use client'
import { useState } from 'react'
import Modal from '../Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import { CiLogin } from "react-icons/ci";
import Link from 'next/link'


interface AuthModalProps {
    variant: 'login' | 'register'
}
const AuthModal = ({ variant }: AuthModalProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: "",
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
    }

    const bodyContent = (
        <section>
            <div>
                <h3 className='py-2 text-2xl font-bold'>Welcome to Travelling.com</h3>
                <p className='text-gray-600'>Register to start travelling!!</p>
            </div>

            <div className='py-2 flex flex-col gap-3'>
                <div>
                    <Label>Name</Label>
                    <Input
                        placeholder='Enter your name'
                    />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input
                        placeholder='Enter your email'
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        placeholder='Enter password'
                    />
                </div>
            </div>
        </section>
    )

    const footerContent = (
        <div className='flex flex-col gap-2'>
            <span className='flex justify-center items-center gap-5'>
                <div className='bg-gray-300 w-full h-[2px]' />
                or
                <div className='bg-gray-300 w-full  h-[2px]' />
            </span>
            <Button variant={'social'} className='w-full flex gap-5'>
                <FcGoogle size={20} /> Sign in with Google
            </Button>
            <Button variant={'social'} className='w-full flex gap-5'>
                <BsGithub size={20} /> Sign in with Github
            </Button>

            <span className='text-base text-center'>Already have an account? &nbsp;
                <Link href={'/login'} className='text-sky-700' >Log in</Link>
            </span>
        </div>

    )
    return (
        <Modal
            isOpen
            disabled={loading}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel='Continue with credentials'
            onClose={() => router.back()}
            title='Register'
            body={bodyContent}
            footer={footerContent}
            loginIcon
        />
    )
}

export default AuthModal
