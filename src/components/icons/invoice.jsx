const InvoiceIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" strokeWidth={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
            <line x1={9} y1={7} x2={10} y2={7}></line>
            <line x1={9} y1={13} x2={15} y2={13}></line>
            <line x1={13} y1={17} x2={15} y2={17}></line>
        </svg>
    )
}

export default InvoiceIcon