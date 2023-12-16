'use server';

import getCurrentUser from "./getCurrentUser";
import prisma from '@/lib/prisma';

export const getFavourites = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return
    try {
        const favourites = await prisma.listing.findMany({
            where: {
                id: {
                    in: currentUser.favouriteIds
                }
            }
        });
    
        return favourites 
    } catch (error) {
        console.error(error)
        return []
    }

   
}
export const addFavourite = async (listingId: string) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return

    try {
        const existingFavourite = currentUser.favouriteIds?.includes(listingId);

        if (!existingFavourite) {
            const updatedUser = await prisma.user.update({
                where: {
                    id: currentUser.id
                },
                data: {
                    favouriteIds: {
                        push: listingId
                    }
                }
            });

            return updatedUser
        }
    } catch (error) {
        console.error(error)
    }

}

export const deleteFavourite = async (listingId: string) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return

    try {
        const existingIds = currentUser.favouriteIds || [];

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favouriteIds: {
                    set: existingIds.filter((id) => id !== listingId),
                }
            }
        });

        return updatedUser
    } catch (error) {
        console.error(error)
    }



}