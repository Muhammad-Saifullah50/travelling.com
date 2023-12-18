'use client'
import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { categories } from '@/constants/categories'
import CategoryBox from './CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import clsx from 'clsx'

const Categories = () => {

    const params = useSearchParams();
    const pathname = usePathname()

    const parameter = params?.get('category')
    return (
        <div className={clsx('flex justify-between items-center py-3 overflow-x-auto ', (pathname.includes('/edit-listing') ||
            pathname.includes('/listings') ||
            pathname === '/trips' ||
            pathname === '/reservations' ||
            pathname === '/properties' ||
            pathname === '/favourites')
            && 'hidden')}>
            {categories.map((category) => (
                <CategoryBox
                    key={category.label}
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                    selected={category.label === parameter}
                />
            ))}
        </div>
    )
}

export default Categories
