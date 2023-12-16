'use client'

import ListingHeader from "./ListingHeader"
import ListingInfo from "./ListingInfo"

interface EditFormProps {
    image: string
    title: string
    description: string
    category: string
    roomCount: number
    bathroomCount: number
    guestCount: number
    locationValue: string
    price: number
    id: string
}
const EditForm = ({ image, title, description, category, roomCount, bathroomCount, guestCount, locationValue, price, id }: EditFormProps) => {
    return (
        <div>
            <ListingHeader
                title={title}
                imageSrc={image}
                locationValue={locationValue}
                id={id}
                isEdit
            />
            <ListingInfo
                roomCount={roomCount}
                guestCount={roomCount}
                bathroomCount={roomCount}
                description={description}
                categorylabel={category}
                location={locationValue!}
                isEdit
            />
        </div>
    )
}

export default EditForm
