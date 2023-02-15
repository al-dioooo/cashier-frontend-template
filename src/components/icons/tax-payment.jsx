const TaxPaymentIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" stroke-width={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1={9} y1={14} x2={15} y2={8}></line>
            <circle cx="9.5" cy="8.5" r=".5" fill="currentColor"></circle>
            <circle cx="14.5" cy="13.5" r=".5" fill="currentColor"></circle>
            <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"></path>
        </svg>
    )
}

export default TaxPaymentIcon