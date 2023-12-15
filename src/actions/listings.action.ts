'use server'

import prisma from '@/lib/prisma'

export const getListings = async () => {
    try {
        let allListings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return allListings

    } catch (error) {
        console.error(error)
        return []
    }
}

export const getListingsByCategory = async ({category}: {category: string}) => {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                category: category
            }

        });

        return listings

    } catch (error) {
        console.error(error)
        return []
    }
}