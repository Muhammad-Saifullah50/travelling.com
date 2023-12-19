import getCurrentUser from "@/actions/getCurrentUser"
import { getListingByOwnerId } from "@/actions/listings.action";
import { getReservations } from "@/actions/reservations.action";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading"
import ListingCard from "@/components/ListingCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "My Properties",
}
const PropertiesPage = async () => {

    const currentUser = await getCurrentUser();

    const properties = await getListingByOwnerId(currentUser?.id!);

    return (
        <MaxWidthWrapper className="mt-4 flex flex-col gap-4">
            <Heading
                title="Your Properties"
                subtitle="Where you're inviting people to stay..."
            />

            {!currentUser && (
                <EmptyState
                    title="Not logged in !"
                    subtitle="Please login again to view your properties"
                />
            )}

            {properties!.length === 0 && (
                <EmptyState
                    title="No properties found"
                    subtitle="Looks like you haven't published any properties"
                />
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>                {properties!.map((property) => (
                <ListingCard
                    currentUser={currentUser!}
                    key={property.id}
                    data={property}
                    actionLabel="Delete Property"
                    secondaryActionLabel='Edit Property'
                    
                />
            ))}

            </div>


        </MaxWidthWrapper>
    )
}

export default PropertiesPage
