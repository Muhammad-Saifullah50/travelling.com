import EmptyState from '@/components/EmptyState'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-4'>
            <EmptyState
                title='Oh no! '
                subtitle='The page you requested could not be found'
            />
            <Link href={'/'}><Button variant={"outline"} size={"lg"}>Back to homepage</Button></Link>
        </div>

    )
}

export default NotFound
