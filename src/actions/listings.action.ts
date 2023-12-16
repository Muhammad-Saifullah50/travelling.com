'use server'

import prisma from '@/lib/prisma'
import getCurrentUser from './getCurrentUser';

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

export const getListingsByCategory = async ({ category }: { category: string }) => {
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

export const getListingById = async (listingId: string) => {

    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        return listing
    } catch (error) {
        console.error(error)
        return 
    }
}

export const getListingByOwnerId = async (ownerId: string) => {

    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return

        const properties = await prisma.listing.findMany({
            where: {
                userId: ownerId
            },
            include: {
                user: true
            }
        });

        return properties
    } catch (error) {
        console.error(error)
        return []
    }

}