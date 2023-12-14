'use client'

interface HeadingProps {
    title: string
    subtitle: string
}
const Heading = ({ title, subtitle }: HeadingProps) => {
    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-xl font-bold'>{title}</h3>
            <p className='text-gray-600'>{subtitle}</p>
        </div>
    )
}

export default Heading
