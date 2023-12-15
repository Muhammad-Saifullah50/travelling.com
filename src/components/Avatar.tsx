'use client'

import { useSession } from "next-auth/react"
import Image from "next/image"

const Avatar = ({ src }: { src?: string }) => {
    const session = useSession();

    return (
        <div>
            <Image
                src={src || session?.data?.user?.image || '/placeholder.jpg'}
                alt='avatar'
                width={30}
                height={30}
                className='object-contain rounded-full'
            />
        </div>
    )
}

export default Avatar
