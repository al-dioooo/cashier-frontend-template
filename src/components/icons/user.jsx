const UserIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" stroke-width={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx={12} cy={7} r={4}></circle>
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
        </svg>
    )
}

export default UserIcon