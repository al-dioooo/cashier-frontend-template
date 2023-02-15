const ArrowNarrowLeftIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" stroke-width={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1={5} y1={12} x2={19} y2={12}></line>
            <line x1={5} y1={12} x2={9} y2={16}></line>
            <line x1={5} y1={12} x2={9} y2={8}></line>
        </svg>
    )
}

export default ArrowNarrowLeftIcon