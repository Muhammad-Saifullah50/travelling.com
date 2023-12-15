import getCurrentUser from "@/actions/getCurrentUser"
import { getListingById } from "@/actions/listings.action"
import Heading from "@/components/Heading"
import ListingHeader from "@/components/ListingHeader"
import ListingInfo from "@/components/ListingInfo"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const ListingPage = async ({ params }: { params: { listingId: string } }) => {
  const { listingId } = params

  const listing = await getListingById(listingId)
  const currentUser = await getCurrentUser();
  return (
    <MaxWidthWrapper>
      <ListingHeader
        title={listing?.title}
        imageSrc={listing?.imageSrc}
        locationValue={listing?.locationValue}
        id={listing?.id}
        currentUser={currentUser}
      />
      <div className="grid grid-cols-1  md:gap-10 mt-6">
        <ListingInfo
          user={listing?.user}
          roomCount={listing?.roomCount}
          guestCount={listing?.roomCount}
          bathroomCount={listing?.roomCount}
          description={listing?.description}
          categorylabel={listing?.category}
        />
      </div>

    </MaxWidthWrapper>
  )
}

export default ListingPage
