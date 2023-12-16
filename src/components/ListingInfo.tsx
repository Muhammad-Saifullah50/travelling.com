'use client'
import { User } from "@prisma/client"
import Avatar from "./Avatar"
import { categories } from "@/constants/categories"
import dynamic from "next/dynamic"
import useCountries from "@/hooks/useCountries"
import { TbBeach } from "react-icons/tb"
import Counter from "./Counter"
import { useForm } from "react-hook-form"
import { Textarea } from "./ui/textarea"
import CountrySelect from "./CountrySelect"

interface ListingInfoProps {
    user?: User | undefined | null
    roomCount: number | undefined
    guestCount: number | undefined
    bathroomCount: number | undefined
    description: string | undefined
    categorylabel: string | undefined
    location: string
    isEdit?: boolean

}

const Map = (dynamic(() => import('../components/Map'), {
    ssr: false
}));

const ListingInfo = ({ user, roomCount, guestCount, bathroomCount, description, categorylabel, location, isEdit }: ListingInfoProps) => {

    const { getByValue } = useCountries();
    const { setValue, watch } = useForm({
        defaultValues: {
            guestCount: guestCount,
            roomCount: roomCount,
            bathroomCount: bathroomCount,
            description: description,
            location: locationValue
        }
    });

    var locationValue = getByValue(location)

    const GuestCount = watch('guestCount')
    const RoomCount = watch('roomCount')
    const BathroomCount = watch('bathroomCount')
    const Description = watch('description')
    const Location = watch('location')



    const selectedCategory = categories.find(category => category.label === categorylabel);
    const Icon = selectedCategory ? selectedCategory.icon : <TbBeach size={40} />;

    const coordinates = getByValue(location)?.latlng
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col ">

                {!isEdit && <div className="flex gap-2 items-center ">
                    <p className="text-lg font-bold">Hosted by {user?.name}</p>
                    <Avatar src={user?.image!} />
                </div>}

                {!isEdit ? (<div className="flex gap-2 text-gray-500">
                    <p>{guestCount} guests</p>
                    <p>{roomCount} rooms</p>
                    <p>{bathroomCount} bathrooms</p>
                </div>
                ) : (
                    <div>
                        <Counter
                            title='No. of Guests'
                            value={GuestCount}
                            onChange={(value) => setValue('guestCount', value)}
                        />
                        <Counter
                            title='No. of Rooms'
                            value={RoomCount}
                            onChange={(value) => setValue('roomCount', value)}
                        />
                        <Counter
                            title='No. of Bathrooms'
                            value={BathroomCount}
                            onChange={(value) => setValue('bathroomCount', value)}
                        />
                    </div>
                )}
            </div>
            <hr />
            <div className="flex gap-2">
                <div className="flex justify-center items-center p-4 text-gray-700">
                    <Icon size={40} />
                </div>
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-left">{selectedCategory?.label}</p>
                    <p className="text-gray-500">{selectedCategory?.description}</p>
                </div>
            </div>
            <hr />
            <div className="h-full">
                {!isEdit ? (<p className="text-neutral-500">{description}</p>) : (
                    <Textarea 
                    defaultValue={description} 
                    cols={10} 
                    className="h-52 text-base" 
                    onChange={(e) => setValue('description', e.target.value)}/>
                )}
            </div>
            <hr />
           {!isEdit ? ( <div className="my-3 h-72">
                <Map center={coordinates} />
            </div>) : (
                <CountrySelect
                value={locationValue}
                //@ts-ignore
                onChange={(value) => setValue('location', value?.value)}
                />
            )}
        </section>
    )
}

export default ListingInfo
