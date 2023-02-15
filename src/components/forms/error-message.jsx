const ErrorMessage = ({ error }) => {
    return (
        <>
            {error && (<span className="text-xs text-red-500">{error}</span>)}
        </>
    )
}

export default ErrorMessage