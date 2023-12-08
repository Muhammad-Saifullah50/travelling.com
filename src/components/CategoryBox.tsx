'use client'

import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"

interface CategoryBoxProps {
    label: string
    icon: any
    description: string
    selected?: boolean
}
const CategoryBox = ({ label, icon: Icon, description, selected }: CategoryBoxProps) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = () => {
        router.push(`?category=${label}`)

        const existingparameter = params.get('category');

        if (existingparameter === label) {
            router.push('/')
        }
    }
    return (
        <div
            className={clsx("text-gray-500 hover:text-gray-700 cursor-pointer flex flex-col justify-center items-center px-4 pb-1",
                selected && 'text-gray-700 border-b-2 border-gray-700')}
            onClick={handleClick}>

            <Icon size={26} />
            <p>{label}</p>
            <p className="sr-only">{description}</p>
        </div>

    )
}

export default CategoryBox
