import { User } from "@prisma/client"
import Avatar from "./Avatar"
import { categories } from "@/constants/categories"

interface ListingInfoProps {
    user: User | undefined | null
    roomCount: number | undefined
    guestCount: number | undefined
    bathroomCount: number | undefined
    description: string | undefined
    categorylabel: string | undefined

}
const ListingInfo = ({ user, roomCount, guestCount, bathroomCount, description, categorylabel
}: ListingInfoProps) => {

    const listingIcon = categories.map((category) => {
        if (category.label === categorylabel) {
            return category
        }
    })

    const Icon = listingIcon[0]?.icon
    return (
        <section className="flex flex-col">
            <div className="flex flex-col ">
                <div className="flex gap-2">
                    <p>Hosted by {user?.name}</p>
                    <Avatar src={user?.image!} />
                </div>
                <div className="flex gap-2">
                    <p>{guestCount} guests</p>
                    <p>{roomCount} rooms</p>
                    <p>{bathroomCount} bathrooms</p>
                </div>
            </div>
            <hr />
            <div className="flex gap-2">
                <div><Icon /></div>
                <div className="flex flex-col gap-2">
                    <p>{listingIcon[0]?.label}</p>
                    <p>{listingIcon[0]?.description}</p>
                </div>
            </div>
            <hr />
            <div>
                <p>{description}</p>
            </div>
            <div></div>
        </section>
    )
}

export default ListingInfo
