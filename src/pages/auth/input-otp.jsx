import { useState } from 'react'
import { Modal } from 'components'
import axios from 'axios'
import ErrorMessage from 'components/forms/error-message'
import { useAuth } from 'contexts/auth-context'
import { useEffect } from 'react'
import moment from 'moment/moment'
import Label from 'components/forms/label'
import Input from 'components/forms/input'
import toast from 'react-hot-toast'
import nProgress from 'nprogress'
import { lang } from 'config'

const Content = ({ data, success }) => {
    const [otp, setOtp] = useState(undefined)

    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        nProgress.start()

        axios.post(`${process.env.REACT_APP_GLOBAL_API_URL}/otp/verify`, {
            otp,
            phone: data
        }).then((response) => {
            success()
            toast.success(response.data.message)
        }).catch(error => {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
            }
            toast.error(error.response.data.message)
            console.log(error.response)
            nProgress.done()
        })
    }

    const resend = (e) => {
        e.preventDefault()
        nProgress.start()

        axios.post(`${process.env.REACT_APP_GLOBAL_API_URL}/otp/resend`, {
            phone: data
        }).then((response) => {
            toast.success(response.data.message)
            nProgress.done()
        }).catch((error) => {
            toast.error(error.response.data.message)
            console.log(error.response)
            nProgress.done()
        })
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div>
                <Label htmlFor="otp" value={lang.otp} />
                <div className="flex space-x-2">
                    <Input onChange={e => setOtp(e.target.value)} error={errors?.otp} id="otp" type="number" />
                    <button onClick={resend} className="px-4 mt-1 text-sm transition border whitespace-nowrap border-neutral-200 bg-neutral-50 rounded-xl active:hover:scale-90">
                        <div>{lang.resend}</div>
                    </button>
                </div>
                <ErrorMessage error={errors?.otp} />
            </div>
            <div className="text-xs">
                <button type="submit" className="items-center px-6 py-3 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                    <span>{lang.submit}</span>
                </button>
            </div>
        </form>
    )
}

const InputOTPModal = ({ isOpen, data, onSuccess }) => {
    const handleSuccess = () => {
        onSuccess()
    }

    return (
        <>
            <Modal closable={false} isOpen={isOpen} onClose={() => {}} title={lang.otp_verification} content={<Content data={data} success={handleSuccess} />} />
        </>
    )
}

export default InputOTPModal