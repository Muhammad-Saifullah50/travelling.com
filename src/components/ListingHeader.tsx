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
    isEdit?: boolean
}
const ListingHeader = ({ title, imageSrc, locationValue, id, currentUser, isEdit }:
    ListingHeaderProps) => {

    const { getByValue } = useCountries();
    const { register, formState: { errors }, setValue, watch } = useForm();
    const location = getByValue(locationValue!);

    const ImageSrc = watch('imageSrc');


    return (
        <section className="flex flex-col gap-4 mt-4">
            {!isEdit
                ? (<Heading
                    title={title}
                    subtitle={`${location?.region}, ${location?.label}`}
                />
                ) : (
                    <Textarea
                        defaultValue={title!}
                        className="text-xl font-bold"
                        cols={1} />
                )}
            <div className="w-full h-[60vh] overflow-hidden relative rounded-xl">
                {!isEdit ? (<Image
                    src={imageSrc!}
                    fill
                    className="object-cover w-full"
                    alt={title!}
                />
                ) : (
                    <ImageUpload
                        value={imageSrc!}
                        onChange={(value) => setValue('imageSrc', value)}
                        isEdit
                    />
                )}

                {!isEdit && (<div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id!}
                        currentUser={currentUser}
                    />
                </div>)}

            </div>
        </section>
    )
}

export default ListingHeader
