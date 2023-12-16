'use server'

import prisma from '@/lib/prisma'
interface Params {
    listingId?: string
    userId?: string
    authorId?: string
}
export const getReservations = async ({ listingId, userId, authorId }: Params) => {

    try {
        const query: any = {}

    if (listingId) {
        query.listingId = listingId
    }

    if (userId) {
        query.userId = userId
    }

    if (authorId) {
        query.listing = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
        where: query,
        include: {
            listing: true
        },
        orderBy:{
            createdAt: 'desc'
        },

    });

    return reservations
    } catch (error) {
        console.error(error)
        return []
    }
    
}