const EyeIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" stroke-width={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"></path>
        </svg>
    )
}

export default EyeIcon