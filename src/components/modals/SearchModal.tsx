"use client"
import { useRouter } from 'next/navigation'
import Modal from '../Modal'
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { categories } from '@/constants/categories';
import CategoryInput from '../CategoryInput';
import CountrySelect from '../CountrySelect';
import dynamic from 'next/dynamic';
import Heading from '../Heading';
import Counter from '../Counter';
import ImageUpload from '../ImageUpload';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import toast from 'react-hot-toast';
import { RentSchema } from '@/validations/RentSchema';
import { ZodError } from 'zod';
import Calendar from '../Calendar';

enum STEPS {
    Location = 1,
    Calendar = 2,
    Info = 2,

}

const SearchModal = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(STEPS.Location)

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset
    } = useForm<FieldValues>({
        defaultValues: {
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
        }
    });

    const initialDateRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    };

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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (step !== STEPS.Info) return onNext();
        try {
            setLoading(true);

            const datatoUse = {
                ...data,
                location: data.location?.value,
                price: Number(data.price),
            }
            const validation = RentSchema.parse(datatoUse);

            const result = await fetch('/api/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datatoUse),
            })

            const response = await result.json();
            if (response.status === 200) {
                toast.success('Listing created');
                router.back();
                router.refresh();
            }
            if (response.status !== 200) {
                toast.error(response.error);
            }
        } catch (error: any) {
            console.error(error)

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

        } finally {
            setLoading(false);
        }
    }
    const actionLabel = () => {
        if (step === STEPS.Info) {
            return 'Create'
        }
        return 'Next'
    }

    const secondaryActionLabel = () => {
        if (step === STEPS.Location) {
            return undefined
        }
        return 'Back'
    }

    const location = watch('location');
    const GuestCount = watch('guestCount');
    const RoomCount = watch('roomCount');
    const BathRoomCount = watch('bathroomCount');


    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    let bodyContent = (
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

    if (step === STEPS.Calendar) {
        bodyContent = (
            <div className='flex flex-col'>
                <Heading
                    title='When do you plan to go?'
                    subtitle='Make sure everyone is free!'
                />
                <Calendar
                value={initialDateRange}
                onChange={(value) => setCustomValue('dateRange', value)}
                />
            </div>
        )
    }

    if (step === STEPS.Info) {
        bodyContent = (
            <div className='flex flex-col'>
                <Heading
                    title='Share some basics about your destination'
                    subtitle='What amenities do you need?'
                />

                <Counter
                    title='Guests'
                    subtitle='How many guests are coming?'
                    value={GuestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms will you need?'
                    value={RoomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you need?'
                    value={BathRoomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }
   
   
    return (
        <Modal
            isOpen
            title='Search for the best destination by adding filters'
            onClose={() => router.back()}
            actionLabel={actionLabel()}
            disabled={loading}
            secondaryActionLabel={secondaryActionLabel()}
            secondaryAction={step === STEPS.Location ? undefined : onBack}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}


        />
    )
}

export default SearchModal

