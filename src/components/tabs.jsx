import { motion } from "framer-motion"

const Tabs = ({ links, layoutId = "tabs" }) => {
    return (
        <div className="flex items-center space-x-4">
            {links.map((row) => (
                <button onClick={() => row.action()} className="relative px-1 py-4">
                    <span className={`${row.active ? 'text-neutral-800' : 'text-neutral-400'} hover:text-neutral-800 h-full transition-all`}>{row.label}</span>
                        {row.active && (
                            <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
                                <motion.span layoutId={layoutId} className="h-[1.5px] bg-neutral-800 w-full"></motion.span>
                            </div>
                        )}
                </button>
            ))}
        </div>
    )
}

export default Tabs
