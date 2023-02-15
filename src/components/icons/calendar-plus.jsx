const CalendarPlusIcon = ({ className, stroke }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={24} height={24} viewBox="0 0 24 24" strokeWidth={stroke ?? 1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <rect x={4} y={5} width={16} height={16} rx={2}></rect>
            <line x1={16} y1={3} x2={16} y2={7}></line>
            <line x1={8} y1={3} x2={8} y2={7}></line>
            <line x1={4} y1={11} x2={20} y2={11}></line>
            <line x1={10} y1={16} x2={14} y2={16}></line>
            <line x1={12} y1={14} x2={12} y2={18}></line>
        </svg>
    )
}

export default CalendarPlusIcon