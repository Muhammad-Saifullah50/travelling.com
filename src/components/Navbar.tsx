import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Image from 'next/image'
import { Menu, Search } from 'lucide-react'
import Avatar from './Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import SignOutBtn from './SignOutBtn'
import { getSession } from '@/actions/getSession'
import Categories from './Categories'

const Navbar = async () => {

  const session = await getSession();

  return (<>

    <MaxWidthWrapper className='flex flex-col '>

      <div className='flex justify-between items-center py-2 border-b-2 border-gray-100'>
        <div className='flex gap-2 items-center ' >
          <Image
            src={'/logo.png'}
            alt='logo'
            width={50}
            height={50}
          />
          <h1 className='text-2xl font-extrabold text-gray-900'>Travelling.com</h1>
        </div>

        <div className='bg-white flex border-2 border-gray-100 py-1 h-10 items-center rounded-full shadow-sm shadow-gray-100 text-sm font-bold px-3'>
          <h3 className='px-4 border-r-2'>Anywhere </h3>
          <h3 className='px-4 border-r-2'>Any Week </h3>
          <h3 className='px-4 font-normal flex gap-2'>Add Guests </h3>
          <Search className='bg-sky-600 text-white rounded-full  h-7 w-7 p-1.5 items-center -mr-3' />
        </div>
        <div className='flex gap-4 items-center'>
        <Link href={'/rent'}>{session && <h2 className='text-sm font-bold'>Register your place</h2>} </Link> 

          <div className='flex gap-2 items-center'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className='w-5 h-5 text-gray-700' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {!session ? (
                  <>
                    <DropdownMenuItem>
                      <Link href={'/register'}>Register</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={'/login'}>Login</Link>
                    </DropdownMenuItem>
                  </>) : (<>
                    <DropdownMenuItem>
                      <Link href={'/trips'}>My Trips</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={'/favourites'}>My Favourites</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={'/reservations'}>My Reservations</Link>
                    </DropdownMenuItem> <DropdownMenuItem>
                      <Link href={'/properties'}>My Properties</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='hidden md:block'>
                      <Link href={'/'}>Register your place</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className='font-semibold'><SignOutBtn /></DropdownMenuItem>
                  </>)}

              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar />
          </div>
        </div>
      </div>

      <div>
        <Categories />
      </div>
    </MaxWidthWrapper>

  </>)
}

export default Navbar


