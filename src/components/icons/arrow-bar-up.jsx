const ArrowBarUpIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" strokeWidth={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1={12} y1={4} x2={12} y2={14}></line>
            <line x1={12} y1={4} x2={16} y2={8}></line>
            <line x1={12} y1={4} x2={8} y2={8}></line>
            <line x1={4} y1={20} x2={20} y2={20}></line>
        </svg>

    )
}

export default ArrowBarUpIcon