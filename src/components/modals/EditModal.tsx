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
import { Listing } from '@prisma/client';
import useCountries from '@/hooks/useCountries';

enum STEPS {
    Category = 0,
    Location = 1,
    Info = 2,
    Images = 3,
    Description = 4,
    Price = 5
}

const EditModal = ({ listing }: { listing: Listing | undefined | null }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(STEPS.Category)
    const {getByValue} = useCountries();
    const Location = getByValue(listing?.locationValue!)

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset
    } = useForm<FieldValues>({
        defaultValues: {
            id: listing?.id || '',
            category: listing?.category || '',
            location: Location || null,
            guestCount: listing?.guestCount || 1,
            roomCount: listing?.roomCount || 1,
            bathroomCount: listing?.bathroomCount || 1,
            imageSrc: listing?.imageSrc || '',
            price: listing?.price || 100,
            title: listing?.title || '',
            description: listing?.description || '',
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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (step !== STEPS.Price) return onNext();
        try {
            setLoading(true);

            const datatoUse = {
                ...data,
                location: data.location?.value,
                price: Number(data.price),
            }
            const validation = RentSchema.parse(datatoUse);

            const result = await fetch('/api/listings', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datatoUse),
            })

            const response = await result.json();
            if (response.status === 200) {
                toast.success('Listing updated');
                router.push('/');
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
        if (step === STEPS.Price) {
            return 'Edit'
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
    const ImageSrc = watch('imageSrc');


    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    let bodyContent = (<>

        <Heading
            title='Which of these best describes your place?'
            subtitle='Edit your category'
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
                    title="Edit your location?"
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
                    subtitle='Edit the amenities you have to offer?'
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
                    title='Edit the photo of your place'
                    subtitle='Show guests what your place looks like!'
                />

                <ImageUpload
                    value={ImageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }
    if (step === STEPS.Description) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title={'Edit the description your place'}
                    subtitle='Short and sweet works best!'
                />
                <div>
                    <Label>Title</Label>
                    <Input
                        placeholder='Title'

                        register={register}
                        id='title'
                        errors={errors}
                        disabled={loading}
                        required
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        placeholder='Description'

                        register={register}
                        id='description'
                        errors={errors}
                        disabled={loading}
                        required
                    />
                </div>


            </div>
        )
    }
    if (step === STEPS.Price) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Now, edit your price'
                    subtitle='How much do you charge per night?'
                />
                <div>
                    <Label>Price in dollars</Label>
                    <Input
                        register={register}
                        id='price'
                        type='number'
                        errors={errors}
                        disabled={loading}
                        required
                    />
                </div>

            </div>
        )
    }
    return (
        <Modal
            isOpen
            title={`Edit ${listing?.title}`}
            onClose={() => router.back()}
            actionLabel={actionLabel()}
            disabled={loading}
            secondaryActionLabel={secondaryActionLabel()}
            secondaryAction={step === STEPS.Category ? undefined : onBack}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}


        />
    )
}

export default EditModal

