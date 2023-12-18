"use client"

import { addFavourite, deleteFavourite } from "@/actions/favourite.action";
import getCurrentUser from "@/actions/getCurrentUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
    listingId: string
    currentUser: any
}
const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {

    const router = useRouter();

    if (!currentUser) {
        return null
    }

    let isFavourite = useMemo(() => {
        const list = currentUser?.favouriteIds || []
        return list.includes(listingId)
    }, [listingId, currentUser])

    const handleClick = async () => {
        if (!isFavourite) {
            addFavourite(listingId)
            toast.success('Added like successfully!')
            router.refresh();
        }

        if (isFavourite) {
            deleteFavourite(listingId)
            toast.success('Unliked successfully !')
            router.refresh();
        }
    }

    return (
        <div onClick={handleClick} className="relative hover:opacity-80 trasition cursor-pointer">
            <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px]' />
            <AiFillHeart size={24} className={isFavourite ? 'fill-rose-500' : 'fill-neutral-500/70'} />
        </div>
    )
}

export default HeartButton
