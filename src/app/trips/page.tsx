import getCurrentUser from "@/actions/getCurrentUser"
import { getReservations } from "@/actions/reservations.action";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading"
import ListingCard from "@/components/ListingCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const TripsPage = async () => {

    const currentUser = await getCurrentUser();

    const reservations = await getReservations({ userId: currentUser?.id })

    return (
        <MaxWidthWrapper className="mt-4 flex flex-col gap-4">
            <Heading
                title="Your Trips"
                subtitle="Where you've been and where you're going"
            />

            {!currentUser && (
                <EmptyState
                    title="Not logged in !"
                    subtitle="Please login again to view your trips"
                />
            )}

            {reservations.length === 0 && (
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you haven't reserved any trips"
                />
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>                {reservations.map((reservation) => (
                <ListingCard
                    currentUser={currentUser!}
                    key={reservation.id}
                    reservation={reservation}
                    data={reservation.listing}
                    actionLabel="Cancel reservation"
                />
            ))}

            </div>


        </MaxWidthWrapper>
    )
}

export default TripsPage
