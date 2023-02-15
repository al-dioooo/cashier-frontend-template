const Label = ({ htmlFor, value }) => {
    return (
        <label htmlFor={htmlFor} className="block text-xs text-neutral-700">{value}</label>
    )
}

export default Label