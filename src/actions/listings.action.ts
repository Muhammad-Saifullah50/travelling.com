'use server'

import prisma from '@/lib/prisma'
import getCurrentUser from './getCurrentUser';
import { notFound } from 'next/navigation';

interface FilterParams {
  category?: string
  startDate?: string
  endDate?: string
  roomCount?: number
  guestCount?: number
  bathroomCount?: number
  locationValue?: string
}
export const getListings = async () => {
  try {
    let allListings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return allListings

  } catch (error) {
    notFound();
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
    notFound();

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
    console.log(listing, 'listing')
    return listing
  } catch (error) {
    notFound();

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
    notFound();

    console.error(error)
    return []
  }

}

export const getListingsByFilters = async ({ category, startDate, endDate, roomCount, guestCount, bathroomCount, locationValue }: FilterParams) => {

  try {
    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })
    return listings
  } catch (error: any) {
    notFound();

    console.error(error)
    return []
  }
}