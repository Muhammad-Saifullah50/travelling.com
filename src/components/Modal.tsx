'use client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { LogInIcon, X } from 'lucide-react';
import { CiLogin } from 'react-icons/ci';

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    loginIcon?: boolean
}

const Modal = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondaryAction, secondaryActionLabel, loginIcon }: ModalProps) => {
    const [showModal, setShowModal] = useState(isOpen);
    const router = useRouter();

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return

        setShowModal(false);
        setTimeout(() => {
            onClose
        }, 300)
    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit()

    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        if (!isOpen) return null
    }, [disabled, secondaryAction]);


    return (
        <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
            <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto'>
                <div className={clsx("translate duration-300 h-full")
                }>
                    <div className='translate h-full md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        {/* Header */}
                        <div className='flex items-center rounded-t p-6 justify-center relative border-b-[1px]'>

                            <Button
                                variant={'ghost'}
                                onClick={handleClose}
                                className='hover:opacity-70 absolute left-9'
                            >
                                <X onClick={() => router.back()} />
                            </Button>
                            <div className='text-lg font-semibold'>
                                {title}
                            </div>
                        </div>

                        {/* body */}
                        <div className='relative  p-6 flex-auto'>
                            {body}
                        </div>

                        {/* footer */}
                        <div className='flex flex-col gap-2 p-6 !pt-0 '>
                            <div className='flex flex-row items-center gap-4 w-full'>

                                {secondaryAction && secondaryActionLabel && (
                                    <Button
                                        onClick={handleSecondaryAction}
                                        className='w-full'>
                                        {secondaryActionLabel}
                                    </Button>
                                )}
                                <Button
                                    className={clsx('w-full', loginIcon && 'flex gap-5')}
                                    disabled={disabled}
                                    onClick={handleSubmit}
                                >
                                    {loginIcon ? <CiLogin size={20} /> : null}  {actionLabel}
                                </Button>

                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal