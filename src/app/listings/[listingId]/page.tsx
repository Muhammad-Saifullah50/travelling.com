import getCurrentUser from "@/actions/getCurrentUser"
import { getListingById } from "@/actions/listings.action"
import Heading from "@/components/Heading"
import ListingHeader from "@/components/ListingHeader"
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
    </MaxWidthWrapper>
  )
}

export default ListingPage
