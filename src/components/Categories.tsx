'use client'
import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { categories } from '@/constants/categories'
import CategoryBox from './CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

const Categories = () => {

    const params = useSearchParams();
    const pathname = usePathname()

    const parameter = params?.get('category')
    return (
        <div className='flex justify-between items-center py-3 overflow-x-auto '>
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