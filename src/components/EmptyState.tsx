"use client"

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import { Button } from "./ui/button"

interface EmptyStateProps {
    title: string
    subtitle: string
    showReset?: boolean
}
const EmptyState = ({ title, subtitle, showReset }: EmptyStateProps) => {

    const router = useRouter();
    return (
        <div className="flex flex-col justify-center items-center min-h-[70vh] gap-4 text-center">
            <Heading
                title={title}
                subtitle={subtitle}
            />
            {showReset && (
                <Button variant={"outline"} onClick={() => router.push("/")}>Remove all filters </Button>
            )}
        </div>
    )
}

export default EmptyState
