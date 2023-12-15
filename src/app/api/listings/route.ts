import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {

    try {
        const body = await request.json();

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized', status: 401 });
        }

        const newListing = await prisma.listing.create({
            data: {
                title: body.title,
                description: body.description,
                imageSrc: body.imageSrc,
                category: body.category,
                roomCount: body.roomCount,
                bathroomCount: body.bathroomCount,
                guestCount: body.guestCount,
                locationValue: body.location,
                price: body.price,
                userId: currentUser.id
            },

        });

        return NextResponse.json({ message: 'Listing created successfully', data: newListing, status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }


}