import { useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"

import axios from 'axios'
import BlankLayout from "layouts/blank-layout"
import Radio from "components/forms/radio"
import { toast } from "react-hot-toast"
import { getUser } from "helpers/auth-helper"
import { lang } from "config"
import ErrorMessage from "components/forms/error-message"
import Label from "components/forms/label"
import nProgress from "nprogress"

const Approve = () => {
    const navigate = useNavigate()
    const user = getUser()

    const params = useParams()
    const number = params.number

    const data = useLoaderData()

    const [approve, setApprove] = useState(undefined)
    const [note, setNote] = useState(null)

    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        nProgress.start()

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/approve`, {
            transaction_number: number,
            approve,
            type: data.payment.type,
            note,
            approved_by: user?.phone
        }).then((res) => {
            toast.success(res.data.message)
            nProgress.done()
            navigate('submitted')
        }).catch((error) => {
            nProgress.done()

            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else if (error.response.status === 400) {
                navigate('already')
            }
            toast.error(error.response.data.message)
        })
    }

    return (
        <BlankLayout title={`${lang.approve.title} ${number}`}>
            <div className="flex items-center justify-center w-full px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div className="flex justify-center">
                            <div className="p-4 text-white rounded-full bg-neutral-800">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"></path>
                                    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4"></path>
                                </svg>
                            </div>
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                            {lang.approve_transaction}
                        </h2>
                        <p className="mt-2 text-sm text-center text-neutral-600">
                            {lang.transaction_number}{' '}
                            <span className="font-semibold text-neutral-800">
                                {number}
                            </span>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Radio error={errors.approve} onChange={(value) => setApprove(value)} title="title" description="description" keyValue="approve" selection={[{ title: lang.approve.title, description: lang.approve.description, approve: 'approved' }, { title: lang.reject.title, description: lang.reject.description, approve: 'rejected' }]} />
                            <ErrorMessage error={errors.approve} />
                        </div>
                        <div>
                            <Label htmlFor="note" value={lang.note} />
                            <textarea onChange={e => setNote(e.target.value)} value={note} name="note" id="note" rows="5" className="block w-full px-4 py-2 mt-1 text-sm transition border border-neutral-200 focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200"></textarea>
                            <ErrorMessage error={errors.note} />
                        </div>
                        <div>
                            <button type="submit" className="items-center w-full px-6 py-3 text-sm text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                                <span>{lang.submit}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BlankLayout>
    )
}

export default Approve