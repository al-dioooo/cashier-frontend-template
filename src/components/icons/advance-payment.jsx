const AdvancePaymentIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" strokeWidth={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-2-2-3 2Z" />
            <path d="M11 7.5h2s.2 0 .3.2l.2.4c0 .4-.1.7-.4 1-.2.3-.6.4-1 .4h-.3c-.3 0-.7-.1-1-.4-.2-.3-.3-.6-.3-1 0-.2 0-.3.2-.4l.4-.2Z" /><path d="M9 13v-.4c0-.8.3-1.6.9-2.2a3 3 0 0 1 4.2 0c.6.6.9 1.4.9 2.2v.4c0 .4-.2.8-.4 1-.3.3-.7.5-1.1.5h-3c-.4 0-.8-.2-1-.5-.3-.2-.5-.6-.5-1Z" />
        </svg>
    )
}

export default AdvancePaymentIcon