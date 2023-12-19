'use client'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { format, isBefore } from 'date-fns'
import useCountries from '@/hooks/useCountries'

const SearchCard = () => {

    const params = useSearchParams();
    const { getByValue } = useCountries();

    const startParam = new Date(params?.get('startDate')!)
    const endParam = new Date(params?.get('endDate')!)

    const startDate = isBefore(startParam, new Date()) ? null : format(startParam, 'PP');
    const endDate = isBefore(endParam, new Date()) ? null : format(endParam, 'PP');

    const category = params?.get('category')
    const locationValue = params?.get('location')

    const location = getByValue(locationValue!)


    return (
        <Link href={'/search'}>
            <div className='max-md:hidden bg-white flex border-2 border-gray-100 py-1 h-10 items-center rounded-full shadow-sm shadow-gray-100 text-sm font-bold px-3'>
                <h3 className='px-4 border-r-2'>{location ? location?.label : 'Anywhere'} </h3>
                <h3 className='px-4 border-r-2'>{(startDate ) && endDate ? `${startDate} - ${endDate}` : 'Any week'}</h3>
                <h3 className='px-4 font-normal flex gap-2'>{category ? category : 'Any Category'}  </h3>
                <Search className='bg-sky-600 text-white rounded-full  h-7 w-7 p-1.5 items-center -mr-3' />
            </div>

            <Search className='md:hidden bg-sky-600 text-white rounded-full  h-7 w-7 p-1.5 items-center -mr-3' />
        </Link>
    )
}

export default SearchCard
