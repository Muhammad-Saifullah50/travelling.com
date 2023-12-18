'use client'
import Image from 'next/image'
import { Oval } from 'react-loader-spinner'
import { usePathname } from 'next/navigation'
const Loading = () => {
    const pathname = usePathname();
    return (
        <div className={`flex flex-col items-center justify-center 
        ${pathname === '/' ? 'min-h-[70vh]' : 'min-h-[75vh]'} 
        ${pathname === '/rent' ||
                pathname === '/edit-listing' ||
                pathname === '/login' ||
                pathname === '/register' ||
                pathname === '/search' ? 'hidden' : ''}`}>
            <Oval
                height={70}
                width={70}
                color="#0369a1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#2563eb"
                strokeWidth={2}
                strokeWidthSecondary={2}

            />
        </div>
    )
}

export default Loading
