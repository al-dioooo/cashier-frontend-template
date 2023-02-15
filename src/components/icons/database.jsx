const DatabaseIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" stroke-width={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0"></path>
            <path d="M4 6v6a8 3 0 0 0 16 0v-6"></path>
            <path d="M4 12v6a8 3 0 0 0 16 0v-6"></path>
        </svg>
    )
}

export default DatabaseIcon