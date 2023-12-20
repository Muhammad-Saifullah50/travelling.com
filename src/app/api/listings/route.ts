import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const POST = async (request: Request) => {

    try {
        const body = await request.json();

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            redirect('/login')
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
export const PATCH = async (request: Request) => {

    try {
        const body = await request.json();

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized', status: 401 });
        }

        const updatedListing = await prisma.listing.update({
            where: {
                id: body.id
            },
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
        console.log(updatedListing, 'updatedListing')
        return NextResponse.json({ message: 'Listing updated successfully', data: updatedListing, status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}

export const DELETE = async (request: Request) => {
    try {
        const body = await request.json();


        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized', status: 401 });
        }

        const deletedListing = await prisma.listing.delete({
            where: {
                id: body.id
            }
        });

        return NextResponse.json({ message: 'Listing deleted successfully', data: deletedListing, status: 200 });
    } catch (error: any) {
        console.error(error?.message);
        return NextResponse.json({ error: error?.message, status: 500 });
    }
}