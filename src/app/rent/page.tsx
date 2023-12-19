import RentModal from "@/components/modals/RentModal"
import { Metadata } from "next"

export const metadata:Metadata = {
    title: 'Rent',
}
const RentPage = () => {
    return (
        <RentModal />
    )
}

export default RentPage
