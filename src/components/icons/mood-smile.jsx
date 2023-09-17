const MoodSmileIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" strokeWidth={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M9 10l.01 0"></path>
            <path d="M15 10l.01 0"></path>
            <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
        </svg>
    )
}

export default MoodSmileIcon