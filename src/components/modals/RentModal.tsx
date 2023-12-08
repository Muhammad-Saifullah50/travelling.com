"use client"
import { useRouter } from 'next/navigation'
import Modal from '../Modal'
import { useState } from 'react';

const RentModal = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    return (
        <Modal
            isOpen
            title='Register your place'
            onClose={() => router.back()}
            actionLabel='Submit'
            onSubmit={() => {}}
            disabled={loading}

        />
    )
}

export default RentModal
