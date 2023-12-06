
const MaxWidthWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`w-full mx-auto max-w-7xl px-5 sm:px-6  ${className}`}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper
