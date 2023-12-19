
const MaxWidthWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`w-full mx-auto max-w-screen-xl px-5 sm:px-6 ${className}`}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper
