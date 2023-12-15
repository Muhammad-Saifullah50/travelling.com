'use client'

import { User } from "@prisma/client"


interface ListingHeaderProps {
    title: string | undefined
    imageSrc: string | undefined
    locationValue: string | undefined
    id: string | undefined
    currentUser: User | undefined | null
}
const ListingHeader = ({ title, imageSrc, locationValue, id, currentUser }: ListingHeaderProps) => {
    return (
        <div>

        </div>
    )
}

export default ListingHeader
