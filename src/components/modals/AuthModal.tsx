'use client'
import { useState } from 'react'
import Modal from '../Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import Link from 'next/link'



const AuthModal = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

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
                <h3 className='py-2 text-2xl font-bold'>{pathname === '/register' ? 'Welcome to Travelling.com' : 'Welcome Back'}</h3>
                <p className='text-gray-600'>{pathname === '/register' ? 'Register to start travelling!!' : 'Login to resume exploring the world!!'}</p>
            </div>

            <div className='py-2 flex flex-col gap-3'>
                {pathname === '/register' && (
                    <div>
                        <Label>Name</Label>
                        <Input
                            name='name'
                            id='name'
                            type='text'
                            //@ts-ignore
                            register={register}
                            errors={errors}
                            placeholder='Enter your name'
                            required
                            className='peer'
                        />
                    </div>
                )}

                <div>
                    <Label>Email</Label>
                    <Input
                        name='email'
                        id='email'
                        type='email'
                        //@ts-ignore
                        register={register}
                        errors={errors}
                        placeholder='Enter your email'
                        required
                    />

                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        name='password'
                        id='password'
                        type='password'
                        //@ts-ignore
                        register={register}
                        errors={errors}
                        placeholder='Enter password'
                        required
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

            <span className='text-base text-center'>{pathname === '/register' ? 'Already have an account?' : 'New to Travelling.com ?'} &nbsp;
                <Link href={pathname === '/register' ? '/login' : '/register'} className='text-sky-700' >{pathname === '/register' ? 'Login' : 'Register'}</Link>
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
        />
    )
}

export default AuthModal
