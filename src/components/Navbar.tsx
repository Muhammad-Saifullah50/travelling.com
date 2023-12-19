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
import SearchCard from './SearchCard'

const Navbar = async () => {

  const session = await getSession();
  return (<>

    <MaxWidthWrapper className='flex flex-col '>

      <div className='flex justify-between items-center py-2 border-b-2 border-gray-100'>
        <Link href={'/'}>
          <div className='flex gap-2 items-center ' >
            <Image
              src={'/logo.png'}
              alt='logo'
              width={50}
              height={50}
            />
            <h1 className='max-sm:hidden text-2xl font-extrabold text-gray-900'>Travelling.com</h1>
          </div>
        </Link>

        <SearchCard />


        <div className='flex gap-4 items-center'>
          <Link href={'/rent'}>{session && <h2 className='max-md:hidden text-sm font-bold'>Register your place</h2>} </Link>

          <div className='flex gap-2 items-center'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className='w-5 h-5 text-gray-700' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />

                {!session ? (
                  <>
                    <Link href={'/register'}>
                      <DropdownMenuItem>
                        Register
                      </DropdownMenuItem>
                    </Link>

                    <Link href={'/login'}>
                      <DropdownMenuItem>
                        Log in
                      </DropdownMenuItem>
                    </Link>
                  </>) : (<>
                    <Link href={'/trips'}>
                      <DropdownMenuItem>
                        My Trips
                      </DropdownMenuItem>
                    </Link>
                    <Link href={'/favourites'}>
                      <DropdownMenuItem>
                        My Favourites
                      </DropdownMenuItem>
                    </Link>
                    <Link href={'/reservations'}>
                      <DropdownMenuItem>
                        My Reservations
                      </DropdownMenuItem>
                    </Link>
                    <Link href={'/properties'}>
                      <DropdownMenuItem>
                        My Properties
                      </DropdownMenuItem>
                    </Link>
                    <Link href={'/rent'}>
                      <DropdownMenuItem>
                        Register your place
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className='font-semibold'><SignOutBtn /></DropdownMenuItem>
                  </>)}

              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar />
          </div>
        </div>
      </div>

      <div >
        <Categories />
      </div>
    </MaxWidthWrapper>

  </>)
}

export default Navbar


