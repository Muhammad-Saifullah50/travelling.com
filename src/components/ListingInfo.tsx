'use client'
import { User } from "@prisma/client"
import Avatar from "./Avatar"
import { categories } from "@/constants/categories"
import dynamic from "next/dynamic"
import useCountries from "@/hooks/useCountries"
import { TbBeach } from "react-icons/tb"

interface ListingInfoProps {
    user: User | undefined | null
    roomCount: number | undefined
    guestCount: number | undefined
    bathroomCount: number | undefined
    description: string | undefined
    categorylabel: string | undefined
    location: string

}

const Map = (dynamic(() => import('../components/Map'), {
    ssr: false
}));

 const ListingInfo = ({ user, roomCount, guestCount, bathroomCount, description, categorylabel, location }: ListingInfoProps) => {

    const { getByValue } = useCountries();
  
    const listingIcon = categories.map((category) => {
        if (category.label === categorylabel) {
            return category;
        }
    });
    
    const selectedCategory = categories.find(category => category.label === categorylabel);
    const Icon = selectedCategory ? selectedCategory.icon : <TbBeach size={40} />;

    const coordinates = getByValue(location)?.latlng
    return (
        <section className="flex flex-col gap-4">
            <div className="flex flex-col ">
                <div className="flex gap-2 items-center ">
                    <p className="text-lg font-bold">Hosted by {user?.name}</p>
                    <Avatar src={user?.image!} />
                </div>
                <div className="flex gap-2 text-gray-500">
                    <p>{guestCount} guests</p>
                    <p>{roomCount} rooms</p>
                    <p>{bathroomCount} bathrooms</p>
                </div>
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
            <div>
                <p className="text-neutral-500">{description}</p>
            </div>
            <hr />
            <div className="my-3 h-72">
                <Map center={coordinates} />
            </div>
        </section>
    )
}

export default ListingInfo
