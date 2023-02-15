import { useState } from 'react'
import { Modal } from 'components'
import { EyeIcon } from 'components/icons'

const Content = ({ closeModal }) => {

    return (
        <div className="mt-8 space-y-8">
            <div>Hello there! This is an example of popup modal</div>
            <div className="text-xs">
                <button onClick={() => closeModal()} className="items-center px-6 py-3 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                    <span>Close</span>
                </button>
            </div>
        </div>
    )
}

const ModalExample = () => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <>
            <button onClick={openModal} className="inline-flex items-center px-4 py-3 space-x-2 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                <EyeIcon className="w-4 h-4" stroke={1.5} />
                <span>Open</span>
            </button>
            <Modal isOpen={isOpen} onClose={closeModal} title="Title" content={<Content closeModal={closeModal} />} />
        </>
    )
}

export default ModalExample