"use client"

import clsx from "clsx"

interface CategoryInputProps {
    selected?: boolean
    label: string
    icon: any
    onClick: (category: any) => void
}
const CategoryInput = ({ selected, label, icon: Icon, onClick }: CategoryInputProps) => {
    return (
        <div className={clsx(" mt-2 flex flex-col gap-2 justify-start border-2 border-gray-400 rounded-md py-3 px-3",
            selected && 'border-gray-950 border-2 ')}
            onClick={() => onClick(label)}
            >

            <Icon size={25} className={clsx('text-gray-500',
                selected && 'text-gray-700')} />
                <p>{label}</p>
        </div>
    )
}

export default CategoryInput
