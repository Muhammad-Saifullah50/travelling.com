import getCurrentUser from "@/actions/getCurrentUser"
import { getListingById } from "@/actions/listings.action"
import { getReservations } from "@/actions/reservations.action"
import ListingHeader from "@/components/ListingHeader"
import ListingInfo from "@/components/ListingInfo"
import ListingReservation from "@/components/ListingReservation"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { listingId: string } }) {
  const { listingId } = params
  const listing = await getListingById(listingId)

  return {
    title: `${listing?.title} | Travelling.com` ,
    description: listing?.description,
  };
}

const ListingPage = async ({ params }: { params: { listingId: string } }) => {
  const { listingId } = params

  const listing = await getListingById(listingId)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser();



  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };
  return (
    <MaxWidthWrapper>
      <ListingHeader
        title={listing?.title}
        imageSrc={listing?.imageSrc}
        locationValue={listing?.locationValue}
        id={listing?.id}
        currentUser={currentUser}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mt-6">
        <ListingInfo
          user={listing?.user}
          roomCount={listing?.roomCount}
          guestCount={listing?.guestCount}
          bathroomCount={listing?.bathroomCount}
          description={listing?.description}
          categorylabel={listing?.category}
          location={listing?.locationValue!}
        />

        <ListingReservation
          reservations={reservations!}
          currentUser={currentUser!}
          listing={listing!}
          initialDateRange={initialDateRange}
        />
      </div>

    </MaxWidthWrapper>
  )
}

export default ListingPage
