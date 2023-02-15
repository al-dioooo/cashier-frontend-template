import { useLoaderData, useNavigate, useParams } from "react-router-dom"

import BlankLayout from "layouts/blank-layout"
import moment from "moment/moment"
import { lang } from "config"

const AlreadySubmitted = ({ title }) => {
    const navigate = useNavigate()
    const params = useParams()
    const number = params.number

    const data = useLoaderData()

    return (
        <BlankLayout title={title}>
            <div className="flex items-center justify-center w-full px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div className="flex justify-center">
                            <div className="p-4 text-white rounded-full bg-neutral-800">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path>
                                    <path d="M9 12l2 2l4 -4"></path>
                                </svg>
                            </div>
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                            {lang.approval_already_submitted}
                        </h2>
                        <p className="mt-2 text-sm text-center text-neutral-600">
                            {lang.transaction_number}{' '}
                            <span className="font-semibold text-neutral-800">
                                {number}
                            </span>
                        </p>
                        <p className="mt-2 text-sm text-center text-neutral-600">
                            {lang.status}{' '}
                            <span className={`${data.history[data.history.length - 1].status === 'outstanding' ? 'text-neutral-800 bg-neutral-100' : data.history[data.history.length - 1].status === 'waiting' ? 'text-yellow-800 bg-yellow-100' : data.history[data.history.length - 1].status === 'approved' ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'} capitalize inline-flex px-2 text-xs font-semibold leading-5 rounded-full`}>
                                {data.history[data.history.length - 1].status}
                            </span>
                        </p>
                        <p className="mt-8 text-sm text-center text-neutral-600">
                            {lang.settled_by}{' '}
                            <span className="font-semibold text-neutral-800">
                                {data.history[data.history.length - 1].approver.name}
                            </span>
                            {' '}
                            <span>
                                {lang.at}
                            </span>
                            {' '}
                            <span className="font-semibold text-neutral-800">
                                {moment(data.history[data.history.length - 1].approved_at).format('MMMM D, YYYY')}
                            </span>
                        </p>
                    </div>
                    <div>
                        <button onClick={() => navigate('/')} className="items-center w-full px-6 py-3 text-sm text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                            <span>{lang.close}</span>
                        </button>
                    </div>
                </div>
            </div>
        </BlankLayout>
    )
}

export default AlreadySubmitted