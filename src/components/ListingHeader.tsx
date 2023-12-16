'use client'

import { User } from "@prisma/client"
import Heading from "./Heading"
import useCountries from "@/hooks/useCountries"
import Image from "next/image"
import HeartButton from "./HeartButton"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { Textarea } from "./ui/textarea"
import ImageUpload from "./ImageUpload"

interface ListingHeaderProps {
    title: string | undefined
    imageSrc: string | undefined
    locationValue: string | undefined
    id: string | undefined
    currentUser?: User | undefined | null
}
const ListingHeader = ({ title, imageSrc, locationValue, id, currentUser }:
    ListingHeaderProps) => {

    const { getByValue } = useCountries();
    const location = getByValue(locationValue!);



    return (
        <section className="flex flex-col gap-4 mt-4">
          <Heading
                    title={title}
                    subtitle={`${location?.region}, ${location?.label}`}
                />
               
            <div className="w-full h-[60vh] overflow-hidden relative rounded-xl">
               <Image
                    src={imageSrc!}
                    fill
                    className="object-cover w-full"
                    alt={title!}
                />
              

                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id!}
                        currentUser={currentUser}
                    />
                </div>

            </div>
        </section>
    )
}

export default ListingHeader
