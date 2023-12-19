import { getListingById } from "@/actions/listings.action"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import EditModal from "@/components/modals/EditModal"

export async function generateMetadata({ params }: { params: { id: string } }) {
    const data = await getListingById(params.id)

    return {
      title: `Edit | ${data?.title} | Travelling.com` ,
      description: data?.description,
    };
  }
const EditListingModal = async ({ params }: { params: { id: string } }) => {

    const data = await getListingById(params.id)

    return (

        <EditModal
            listing={data}
        />

    )
}

export default EditListingModal
