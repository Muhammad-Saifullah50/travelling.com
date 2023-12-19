"use client"
import { useRouter } from 'next/navigation'
import Modal from '../Modal'
import { useCallback, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import CountrySelect, { CountrySelectValue } from '../CountrySelect';
import dynamic from 'next/dynamic';
import Heading from '../Heading';
import Counter from '../Counter';
import Calendar from '../Calendar';
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { categories } from '@/constants/categories';
import CategoryInput from '../CategoryInput';
enum STEPS {
    Location = 1,
    Category = 2,
    Date = 3,
    Info = 4,
}

const SearchModal = () => {
    const router = useRouter();
    const [step, setStep] = useState(STEPS.Location)
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [category, setCategory] = useState(categories[0].label);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const formattedStartDate = new Date(dateRange.startDate!).toISOString();
    const formattedEndDate = new Date(dateRange.endDate!).toISOString();

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, [setStep]);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, [setStep]);

    const onSubmit = async () => {
        if (step !== STEPS.Info) return onNext();

        router.push(`/?startDate=${formattedStartDate}&endDate=${formattedEndDate}&location=${location?.value}&guestCount=${guestCount}&roomCount=${roomCount}&bathroomCount=${bathroomCount}&category=${category}`);

        router.refresh();
    }
    const actionLabel = () => {
        if (step === STEPS.Info) {
            return 'Search'
        }
        return 'Next'
    }

    const secondaryActionLabel = () => {
        if (step === STEPS.Location) {
            return undefined
        }
        return 'Back'
    }


    const Map = dynamic(() => import('../Map'), {
        ssr: false
    });

    let bodyContent = (
        <>
            <Heading
                title="Where do you want to go?"
                subtitle="Help us find the perfect place!"
            />

            <CountrySelect
                onChange={(value) => setLocation(value as CountrySelectValue)}
                value={location}
            />
            <Map center={location?.latlng} />
        </>
    )

    if (step === STEPS.Category) {
        bodyContent = (<>

            <Heading
                title='What sort of place would you like to visit?'
                subtitle='Get recommendations near your chosen category'
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item) => (
                    <CategoryInput
                        key={item.label}
                        selected={item.label === category}
                        label={item.label}
                        icon={item.icon}
                        onClick={(category) => setCategory(category)}
                    />
                ))}
            </div>
        </>)
    }
    if (step === STEPS.Date) {
        bodyContent = (
            <div className='flex flex-col'>
                <Heading
                    title='When do you plan to go?'
                    subtitle='Make sure everyone is free!'
                />
                <Calendar
                    value={dateRange}
                    //@ts-ignore
                    onChange={(value) => setDateRange(value.selection)}
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
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms will you need?'
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you need?'
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }


    return (
        <Modal
            isOpen
            title='Search by adding filters'
            onClose={() => router.back()}
            actionLabel={actionLabel()}
            secondaryActionLabel={secondaryActionLabel()}
            secondaryAction={step === STEPS.Location ? undefined : onBack}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default SearchModal

