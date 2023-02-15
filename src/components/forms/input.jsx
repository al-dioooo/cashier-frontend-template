const Input = ({ onChange, value, id, type, error, disabled = false, min, max, placeholder }) => {
    return (
        <input placeholder={placeholder} min={min} max={max} disabled={disabled} onChange={onChange} value={value} id={id} autoComplete="off" type={type ?? "text"} className={`${error ? 'border-red-200' : 'border-neutral-200'} ${disabled ? 'bg-neutral-100 opacity-60' : ''} block w-full px-2 py-2 mt-1 text-sm transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`} />
    )
}

export default Input