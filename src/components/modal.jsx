import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XIcon } from './icons'

const Modal = ({ onClose, isOpen, title, content, size = 'xl', closable = true }) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={`max-w-${size} w-full p-6 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl`}>
                                    <div className="flex items-center justify-between">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-medium leading-6 text-neutral-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                        {closable && (
                                            <button onClick={onClose} class="inline-flex items-center p-2 transition bg-neutral-100 rounded-full active:hover:scale-90">
                                                <XIcon className="w-4 h-4" stroke={1.5} />
                                            </button>
                                        )}
                                    </div>
                                    {content}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal