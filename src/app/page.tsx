import getCurrentUser from '@/actions/getCurrentUser';
import { getListings, getListingsByCategory, getListingsByFilters } from '@/actions/listings.action'
import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/ListingCard';
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Metadata } from 'next';

interface HomeProps {
  searchParams: {
    category?: string;
    startDate?: string;
    endDate?: string;
    guestCount?: number;
    locationValue?: string;
    roomCount?: number;
    bathroomCount?: number;
  } ;
}

export const metadata:Metadata = {
  title: "Home",
}
export default async function Home({ searchParams }: HomeProps) {

  let listings = await getListings();

  if (searchParams.category) {
    //@ts-ignore
    listings = await getListingsByCategory(searchParams);
  }

  if (searchParams.startDate) {
    listings = await getListingsByFilters(searchParams);
  }

  const currentUser = await getCurrentUser();
  return (
    <MaxWidthWrapper className='mt-8'>
      {listings.length > 0
        ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 min-h-[70vh]'>
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser!}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title='No listings found that match your search'
            subtitle='Try changing or removing some of your filters'
            showReset
          />)}
    </MaxWidthWrapper>
  )
}
