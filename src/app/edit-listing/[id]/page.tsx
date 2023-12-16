import { getListingById } from "@/actions/listings.action"
import EditForm from "@/components/EditForm"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const EditListingPage = async ({ params }: { params: { id: string } }) => {

    const data = await getListingById(params.id)

    return (
        <MaxWidthWrapper>

            {data && (
                <EditForm
                    image={data.imageSrc}
                    title={data.title}
                    description={data.description}
                    category={data.category}
                    roomCount={data.roomCount}
                    bathroomCount={data.bathroomCount}
                    guestCount={data.guestCount}
                    locationValue={data.locationValue}
                    price={data.price}
                    id={data.id}
                />
            )}

        </MaxWidthWrapper>
    )
}

export default EditListingPage
