"use client"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
    listingId: string
    currentUser: any
}
const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {

    const hasFavourited = false;
    const toggleFavourite = () => { };

    return (
        <div onClick={toggleFavourite} className="relative hover:opacity-80 trasition cursor-pointer">
            <AiOutlineHeart size={28} className='fill-white absolute -top-[2px] -right-[2px]'/>
            <AiFillHeart size={24} className={hasFavourited ? 'fill-rose-500' : 'fill-neutral-500/70'} />
        </div>
    )
}

export default HeartButton