import getCurrentUser from "@/actions/getCurrentUser";
import { getReservations } from "@/actions/reservations.action";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import ListingCard from "@/components/ListingCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

// this page is to showcase the properties which people have reserved
const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    const reservations = await getReservations({ authorId: currentUser?.id })

    return (
        <MaxWidthWrapper className="mt-4 flex flex-col gap-4">
            <Heading
                title="Reservations on your properties"
                subtitle="Where people are coming to and leaving from ..."
            />

            {!currentUser && (
                <EmptyState
                    title="Not logged in !"
                    subtitle="Please login again to view reservations on your properties"
                />
            )}

            {reservations.length === 0 && (
                <EmptyState
                    title="No Bookings found"
                    subtitle="Looks like people haven't reserved any trips on your properties"
                />
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>                {reservations.map((reservation) => (
                <ListingCard
                    currentUser={currentUser!}
                    key={reservation.id}
                    reservation={reservation}
                    data={reservation.listing}
                    actionLabel="Cancel guest reservation"
                />
            ))}

            </div>


        </MaxWidthWrapper>  )
}

export default ReservationsPage


