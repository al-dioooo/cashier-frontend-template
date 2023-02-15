const ArrowsDoubleNeSwIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" strokeWidth={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 14l11 -11"></path>
            <path d="M10 3h4v4"></path>
            <path d="M10 17v4h4"></path>
            <path d="M21 10l-11 11"></path>
        </svg>
    )
}

export default ArrowsDoubleNeSwIcon