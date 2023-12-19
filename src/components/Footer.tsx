import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Image from 'next/image';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (

        <MaxWidthWrapper>
            <footer className='flex justify-between items-center w-full mt-4 py-2 border-t-2 border-gray-100'>
                <div className='flex items-center gap-3'>
                    <Image
                        src={'/logo.png'}
                        alt='logo'
                        width={50}
                        height={50}
                    />
                    <h1 className='text-lg font-semibold'>Travelling.com</h1>
                </div>
                <div>
                    <p className='text-center text-gray-500'>Copyright © {currentYear} - All right reserved</p>
                </div>

            </footer>


        </MaxWidthWrapper>
    )
}

export default Footer
