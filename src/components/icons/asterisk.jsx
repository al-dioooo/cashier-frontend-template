const AsteriskIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" stroke-width={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12l8 -4.5"></path>
            <path d="M12 12v9"></path>
            <path d="M12 12l-8 -4.5"></path>
            <path d="M12 12l8 4.5"></path>
            <path d="M12 3v9"></path>
            <path d="M12 12l-8 4.5"></path>
        </svg>
    )
}

export default AsteriskIcon