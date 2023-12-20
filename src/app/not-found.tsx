import EmptyState from '@/components/EmptyState'
import { Button } from '@/components/ui/button'
import React from 'react'

const NotFound = () => {
    return (
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-4'>
            <EmptyState
                title='Oh no! '
                subtitle='The page you requested could not be found'
            />
            <Button variant={"outline"} size={"lg"}>Back to homepage</Button>
        </div>

    )
}

export default NotFound
