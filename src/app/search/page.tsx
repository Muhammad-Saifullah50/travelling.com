import SearchModal from "@/components/modals/SearchModal"
import { Metadata } from "next"

export const metadata: Metadata = {
   title: 'Search'
}
const SearchPage = () => {
    return (
       <SearchModal />

    )
  }
  
  export default SearchPage