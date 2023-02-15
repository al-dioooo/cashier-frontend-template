// [WIP]

const StatusPill = ({ statuses, current }) => {
    return (
        <span className={`${row.status === 'outstanding' ? 'text-yellow-800 bg-yellow-100' : row.status === 'settled' ? 'text-green-800 bg-green-100' : (row.status === 'waiting' ? 'text-neutral-800 bg-neutral-100' : 'text-red-800 bg-red-100')} inline-flex px-2 text-xs font-semibold leading-5 rounded-full`}>
            {statuses.find}
        </span>
    )
}

export default StatusPill