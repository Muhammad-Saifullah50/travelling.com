"use client"
import { useRouter } from 'next/navigation'
import Modal from '../Modal'
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { categories } from '@/constants/categories';
import CategoryInput from '../CategoryInput';
import CountrySelect from '../CountrySelect';

enum STEPS {
    Category = 0,
    Location = 1,
    Info = 2,
    Images = 3,
    Description = 4,
    Price = 5
}

const RentModal = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(STEPS.Category)

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const setCustomValue = (id: string, value: string) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }
    const onBack = () => {
        setStep((value) => value - 1)
    }
    const onNext = () => {
        setStep((value) => value + 1)
    }

    const actionLabel = () => {
        if (step === STEPS.Price) {
            return 'Create'
        }
        return 'Next'
    }

    const secondaryActionLabel = () => {
        if (step === STEPS.Category) {
            return undefined
        }
        return 'Back'
    }

    const category = watch('category');

    let bodyContent = (<>
        <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-bold'>Which of these best describe your place? </h3>
            <p className='text-gray-600'>Pick a category</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
            {categories.map((item) => (
                <CategoryInput
                    key={item.label}
                    selected={item.label === category}
                    label={item.label}
                    icon={item.icon}
                    onClick={(category: any) => setCustomValue('category', category)}
                />
            ))}
        </div>
    </>)

    if (step === STEPS.Location) {
        bodyContent = (
            <>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-xl font-bold'>Where is your place located? </h3>
                    <p className='text-gray-600'>Help guests find you</p>
                </div>

                <CountrySelect/>
            </>
        )
    }
    if (step === STEPS.Info) {
        bodyContent = (
            <div>rrrrr</div>
        )
    }
    if (step === STEPS.Images) {
        bodyContent = (
            <div>rrrrr</div>
        )
    }
    if (step === STEPS.Description) {
        bodyContent = (
            <div>rrrrr</div>
        )
    }
    if (step === STEPS.Price) {
        bodyContent = (
            <div>rrrrr</div>
        )
    }
    return (
        <Modal
            isOpen
            title='Register your place'
            onClose={() => router.back()}
            actionLabel={actionLabel()}
            disabled={loading}
            secondaryActionLabel={secondaryActionLabel()}
            secondaryAction={step === STEPS.Category ? undefined : onBack}
            onSubmit={onNext}
            body={bodyContent}


        />
    )
}

export default RentModal
