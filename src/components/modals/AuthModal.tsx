'use client'
import { useState } from 'react';
import Modal from '../Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { RegisterSchema } from '@/validations/RegisterSchema';
import { ZodError } from 'zod';

const AuthModal = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const { handleSubmit, register, formState: { errors } } = useForm<FieldValues>({
        shouldFocusError: true,
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        try {
            setLoading(true);

            if (pathname === '/register') {
                try {
                    const validation = RegisterSchema.parse(data);

                    const result = await fetch('/api/register', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    const response = await result.json();
                    if (response.status === 200) {
                        router.back()
                    }

                } catch (error) {
                    if (error instanceof ZodError) {
                        const errmsg = error.flatten().fieldErrors;
                        const firstError = Object.keys(errmsg)[0];
                        const firstErrorValue = errmsg[firstError];
                        //@ts-ignore
                        toast.error(firstErrorValue[0]);

                        if (Object.keys(errmsg).length === 0) {
                            toast.error(error.flatten().formErrors[0]);

                        }
                    }
                }
            }

            if (pathname === '/login') {
                const signInResult = await signIn('credentials', {
                    ...data,
                    redirect: false
                });

                if (signInResult?.error) {
                    toast.error(signInResult.error);
                }

                if (!signInResult?.error && signInResult?.ok) {
                    toast.success('Logged in successfully');
                    router.back();
                }
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const socialSignin = async (action: string) => {
        try {
            setLoading(true);
            const result = await signIn(action, {
                callbackUrl: '/',
                redirect: false
            });
            if (result?.error) {
                toast.error(result.error);
            }
            if (!result?.error && result?.ok) {
                toast.success('Logged in successfully');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const bodyContent = (
        <section>
            <div>
                <h3 className='py-2 text-2xl font-bold'>{pathname === '/register' ? 'Welcome to Travelling.com' : 'Welcome Back'}</h3>
                <p className='text-gray-600'>{pathname === '/register' ? 'Register to start travelling!!' : 'Login to resume exploring the world!!'}</p>
            </div>

            <form className='py-2 flex flex-col gap-3'>
                {pathname === '/register' && (
                    <div>
                        <Label>Name</Label>
                        <Input
                            name='name'
                            id='name'
                            type='text'
                            register={register}
                            errors={errors}
                            placeholder='Enter your name'
                            required
                            disabled={loading}
                        />
                    </div>
                )}

                <div>
                    <Label>Email</Label>
                    <Input
                        name='email'
                        id='email'
                        type='email'
                        register={register}
                        errors={errors}
                        placeholder='Enter your email'
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        name='password'
                        id='password'
                        type='password'
                        register={register}
                        errors={errors}
                        placeholder='Enter password'
                        required
                        disabled={loading}
                    />
                </div>
            </form>
        </section>
    );

    const footerContent = (
        <div className='flex flex-col gap-2'>
            <span className='flex justify-center items-center gap-5'>
                <div className='bg-gray-300 w-full h-[2px]' />
                or
                <div className='bg-gray-300 w-full  h-[2px]' />
            </span>
            <Button variant={'social'} className='w-full flex gap-5'
                onClick={() => socialSignin('google')}
                disabled={loading}>
                <FcGoogle size={20} /> Sign in with Google
            </Button>
            <Button
                variant={'social'}
                className='w-full flex gap-5'
                onClick={() => socialSignin('github')}
                disabled={loading}>
                <BsGithub size={20} /> Sign in with Github
            </Button>

            <span className='text-base text-center'>{pathname === '/register' ? 'Already have an account?' : 'New to Travelling.com ?'} &nbsp;
                <Link href={pathname === '/register' ? '/login' : '/register'} className='text-sky-700' >{pathname === '/register' ? 'Login' : 'Register'}</Link>
            </span>
        </div>
    );

    return (
        <Modal
            isOpen
            disabled={loading}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel='Continue with credentials'
            onClose={() => router.back()}
            title={pathname === '/register' ? 'Register' : 'Login'}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default AuthModal;
