import { Transition } from "@headlessui/react"
import { Toaster, ToastIcon, resolveValue } from "react-hot-toast"

const Toast = () => {
    return (
        <Toaster position="bottom-left" toastOptions={{ error: { duration: 8000 } }}>
            {(t) => (
                <Transition
                    appear
                    show={t.visible}
                    className="flex p-4 transform bg-white rounded-full shadow-xl"
                    enter="transition-all duration-500"
                    enterFrom="blur translate-y-8 opacity-0 scale-50"
                    enterTo="blur-0 opacity-100 scale-100"
                    leave="transition-all duration-500"
                    leaveFrom="blur-0 opacity-100 scale-100"
                    leaveTo="blur translate-y-8 opacity-0 scale-75"
                >
                    <ToastIcon toast={t} />
                    <p className="px-2">{resolveValue(t.message)}</p>
                </Transition>
            )}
        </Toaster>
    )
}

export default Toast