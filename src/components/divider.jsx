const Divider = ({ content, className }) => {
    return (
        <div className="flex items-center space-x-4">
            <div className={`text-xs ${className}`}>
                {content}
            </div>
            <div className="flex-grow border-t border-neutral-900"></div>
        </div>
    )
}

export default Divider