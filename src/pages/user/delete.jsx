import { useState } from 'react'
import { Modal } from 'components'
import axios from 'axios'
import nProgress from 'nprogress'
import toast from 'react-hot-toast'
import { lang } from 'config'

const Content = ({ data, success }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        nProgress.start()

        axios.delete(`${process.env.REACT_APP_GLOBAL_API_URL}/user/destroy`, {
            data: {
                phone: data?.phone
            }
        }).then((response) => {
            success()
            toast.success(response.data.message)
        }).catch(error => {
            toast.error(error.response.data.message)
            console.log(error.response)
            nProgress.done()
        })
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            {lang.are_you_sure_you_want_to_delete} <span className="inline-flex px-3 py-1 text-sm font-medium rounded-xl bg-neutral-200 text-neutral-600">{data?.name}</span> ?
            <div className="text-xs">
                <button type="submit" className="items-center px-6 py-3 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                    <span>{lang.delete}</span>
                </button>
            </div>
        </form>
    )
}

const Delete = ({ data, onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleSuccess = () => {
        closeModal()
        onSuccess()
    }

    return (
        <>
            <button onClick={openModal} class="inline-flex items-center p-1 text-white transition bg-red-800 rounded-full active:hover:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1={4} y1={7} x2={20} y2={7}></line>
                    <line x1={10} y1={11} x2={10} y2={17}></line>
                    <line x1={14} y1={11} x2={14} y2={17}></line>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                </svg>
            </button>
            <Modal isOpen={isOpen} onClose={closeModal} title={`${lang.delete} ${lang.user}`} content={<Content data={data} success={handleSuccess} />} />
        </>
    )
}

export default Delete