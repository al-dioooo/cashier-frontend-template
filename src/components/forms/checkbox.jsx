const Checkbox = ({ onChange, value, id, checked, error, disabled = false }) => {
    return (
        <input key={Math.random()} disabled={disabled} checked={checked} onChange={onChange} value={value} id={id} autoComplete="off" type="checkbox" className={`${error ? 'border-red-200' : 'border-neutral-200'} ${disabled ? 'opacity-50' : 'cursor-pointer'} mt-1 transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 checked:bg-neutral-800 checked:hover:bg-neutral-600 checked:focus:bg-neutral-800`} />
    )
}

export default Checkbox