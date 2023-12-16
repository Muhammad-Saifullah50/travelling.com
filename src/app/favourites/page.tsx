import { getFavourites } from "@/actions/favourite.action";
import getCurrentUser from "@/actions/getCurrentUser"
import { getReservations } from "@/actions/reservations.action";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading"
import ListingCard from "@/components/ListingCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const FavouritesPage = async () => {

    const currentUser = await getCurrentUser();

    const favourites = await getFavourites();

    return (
        <MaxWidthWrapper className="mt-4 flex flex-col gap-4">
            <Heading
                title="Your Favourites"
                subtitle="Your favourite destinations"
            />

            {!currentUser && (
                <EmptyState
                    title="Not logged in !"
                    subtitle="Please login again to view your favourites"
                />
            )}

            {favourites!.length === 0 && (
                <EmptyState
                    title="No favourites found"
                    subtitle="Looks like you haven't liked any destinations"
                />
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>                {favourites!.map((favourite) => (
                <ListingCard
                    currentUser={currentUser!}
                    key={favourite.id}
                    data={favourite}
                />
            ))}

            </div>


        </MaxWidthWrapper>
    )
}

export default FavouritesPage
