const RoleUserBranchIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" stroke-width={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M16 8l-4 -4l-4 4"></path>
            <path d="M12 20v-16"></path>
            <path d="M18 18c-4 -1.333 -6 -4.667 -6 -10"></path>
            <path d="M6 18c4 -1.333 6 -4.667 6 -10"></path>
        </svg>
    )
}

export default RoleUserBranchIcon