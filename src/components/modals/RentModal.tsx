"use client"
import { useRouter } from 'next/navigation'
import Modal from '../Modal'
import { useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { categories } from '@/constants/categories';
import CategoryInput from '../CategoryInput';
import CountrySelect from '../CountrySelect';
import dynamic from 'next/dynamic';
import Heading from '../Heading';
import Counter from '../Counter';
import ImageUpload from '../ImageUpload';

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

    const setCustomValue = useMemo(() => (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        });
    }, [setValue]);

    const onBack = useMemo(() => () => {
        setStep((value) => value - 1);
    }, [setStep]);

    const onNext = useMemo(() => () => {
        setStep((value) => value + 1);
    }, [setStep]);

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
    const location = watch('location');

    const GuestCount = watch('guestCount');
    const RoomCount = watch('roomCount');
    const BathRoomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    let bodyContent = (<>

        <Heading
            title='Which of these best describe your place?'
            subtitle='Pick a category'
        />

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
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />

                <CountrySelect
                    onChange={(value) => setCustomValue('location', value)}
                    value={location}
                />
                <Map center={location?.latlng} />
            </>
        )
    };

    if (step === STEPS.Info) {
        bodyContent = (
            <div className='flex flex-col'>
                <Heading
                    title='Share some basics about your place'
                    subtitle='What amenities do you have?'
                />

                <Counter
                    title='Guests'
                    subtitle='How many guests do you allow?'
                    value={GuestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms do you have?'
                    value={RoomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you have?'
                    value={BathRoomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }
    if (step === STEPS.Images) {
        bodyContent = (
            <div>
                <Heading
                    title='Add a photo of your place'
                    subtitle='Show guests what your place looks like!'
                />

                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
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
