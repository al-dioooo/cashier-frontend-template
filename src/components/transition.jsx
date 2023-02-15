import { motion } from "framer-motion"

const defaultVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

const slideVariant = {
    initial: { opacity: 0, x: '-100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
}

const reversedSlideVariant = {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
}

const Transition = ({ children, type, reversed }) => {
    const variant = type === 'slide' ? (reversed ? reversedSlideVariant : slideVariant) : defaultVariant

    return (
        <motion.div
            variants={variant}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: .5, type: "tween" }}
        >
            {children}
        </motion.div>
    )
}

export default Transition