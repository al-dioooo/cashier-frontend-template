import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { XIcon } from 'components/icons'

const styles = [
    {
        type: "default",
        background: "bg-neutral-50/50",
        icon: "bg-neutral-700",
        border: "border-neutral-200",
        close: "bg-neutral-100"
    },
    {
        type: "danger",
        background: "bg-red-50/50",
        icon: "bg-red-700",
        border: "border-red-200",
        close: "bg-red-100"
    }
]

const Banner = ({ type = "default", closable = true, visible = true, title, subtitle, icon }) => {
    const [isVisible, setIsVisible] = useState(visible)
    const [style, setStyle] = useState(styles.find((row) => row.type === type))

    const onClose = () => {
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {
                isVisible && (
                    <motion.div exit={{ opacity: 0, height: 0 }} transition={{ delay: 1, duration: .5 }} className="overflow-hidden">
                        <div className={`${style.background} ${style.border} flex items-center justify-between w-full p-4 border border-dashed rounded-xl`}>
                            <div className="flex space-x-4">
                                <motion.div exit={{ scale: .5, opacity: 0 }} transition={{ ease: 'backIn' }} className={`${style.icon} flex items-center justify-center p-2 text-white h-max rounded-xl`}>
                                    {icon}
                                </motion.div>
                                <div className="space-y-1">
                                    <motion.div exit={{ y: '-50%', opacity: 0 }} transition={{ duration: .5, ease: 'circIn' }} className="text-xl">{title}</motion.div>
                                    <motion.div exit={{ y: '-80%', opacity: 0 }} transition={{ delay: .2, duration: .5, ease: 'circIn' }}>{subtitle}</motion.div>
                                </div>
                            </div>
                            {closable && (
                                <motion.button exit={{ scale: .5, opacity: 0 }} transition={{ ease: 'backIn', delay: .5 }} onClick={onClose} class={`${style.close} inline-flex items-center p-2 transition rounded-full active:hover:scale-90`}>
                                    <XIcon className="w-4 h-4" stroke={1.5} />
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Banner