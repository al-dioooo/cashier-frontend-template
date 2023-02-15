import { useState } from 'react'
import { Modal } from 'components'
import axios from 'axios'
import nProgress from 'nprogress'
import Form from './form'
import toast from 'react-hot-toast'
import { lang } from 'config'

const Content = ({ success }) => {
    const [errors, setErrors] = useState({})

    const handleSubmit = (data) => {
        nProgress.start()

        if (data.user && data.email && data.phone) {
            success()
            toast.success("Data successfully submitted!")
        } else {
            setErrors({
                user: data.user ? undefined : "The user field is required.",
                email: data.email ? undefined : "The email field is required.",
                phone: data.phone ? undefined : "The phone field is required.",
            })

            toast.error("The given data is invalid.")
            nProgress.done()
        }
    }

    return (
        <Form errors={errors} onSubmit={handleSubmit} />
    )
}

const Create = ({ onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleSuccess = () => {
        closeModal()
        onSuccess()
    }

    return (
        <>
            <button onClick={openModal} className="inline-flex items-center px-4 py-3 space-x-2 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1={12} y1={5} x2={12} y2={19}></line>
                    <line x1={5} y1={12} x2={19} y2={12}></line>
                </svg>
                <span>{lang.create}</span>
            </button>
            <Modal size="4xl" isOpen={isOpen} onClose={closeModal} title={`${lang.create} ${lang.data}`} content={<Content success={handleSuccess} />} />
        </>
    )
}

export default Create