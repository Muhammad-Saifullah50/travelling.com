import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
export const POST = async (request: NextRequest) => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ error: 'Unauthorized', status: 401 });
    }

    const body = await request.json();

    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.json({ error: 'Missing Fields', status: 400 });
    }

    const newReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                }
            }
        }
    });

    return NextResponse.json({ message: 'Success', data: newReservation, status: 200 });
}

export const DELETE = async (request: NextRequest) => {
    const body = await request.json();

    const { reservationId } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ error: 'Unauthorized', status: 401 });
    }

    const updatedReservation = await prisma.reservation.delete({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                {
                    listing: { userId: currentUser.id }
                }
            ]
        }
    })

    return NextResponse.json({ message: 'Success', data: updatedReservation, status: 200 });
}