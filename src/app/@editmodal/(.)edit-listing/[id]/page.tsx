import { getListingById } from "@/actions/listings.action"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import EditModal from "@/components/modals/EditModal"

const EditListingModal = async ({ params }: { params: { id: string } }) => {

    const data = await getListingById(params.id)

    return (

        <EditModal
            listing={data}
        />

    )
}

export default EditListingModal
