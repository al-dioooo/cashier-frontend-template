import { useEffect, useState } from "react"
import { Link, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import {
    BranchIcon,
    TrendingUpIcon,
    ArrowsDoubleNeSwIcon,
    DollarIcon,
    CalendarPlusIcon,
    CalendarIcon,
    ReceiptIcon,
    NoteIcon,
    MailIcon,
    PhoneIcon,
    UserCircleIcon,
    AsteriskIcon
} from "components/icons"

import AppLayout from "layouts/app-layout"
import Transition from "components/transition"
import Divider from "components/divider"

import moment from "moment/moment"
import { ArrowRightIcon } from "components/icons"
import { lang } from "config"

const BillDetail = () => {
    const number = useParams().number
    const navigate = useNavigate()
    const location = useLocation()

    const [prevRouteState, setPrevRouteState] = useState({})

    const data = useLoaderData()

    useEffect(() => {
        const getPrevRouteState = async () => {
            setPrevRouteState({
                back: location.state.back,
                from: location.state.from,
                transition: location.state.transition
            })
        }
        getPrevRouteState()
    }, [])

    return (
        <AppLayout title={number}>
            <div className="p-8 space-y-16">
                <div>
                    {prevRouteState.back && (
                        <button className="transition hover:opacity-50" onClick={() => navigate(-1)}>
                            <motion.h3 layout transition={{ duration: .5, type: "tween" }} layoutId={prevRouteState.back} className="text-sm">{prevRouteState.back}</motion.h3>
                        </button>
                    )}
                    <Transition reversed>
                        <h1 className="text-3xl font-medium">
                            {number}
                        </h1>
                    </Transition>
                </div>
                <Transition type="slide" reversed>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-xl bg-neutral-100">
                                <BranchIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-medium">{data.branch.name}</div>
                                <div className="flex items-center space-x-2 text-xs">
                                    <div>{data.branch.contact}</div>
                                    <div className="font-light text-neutral-200">|</div>
                                    <div>{data.branch.address}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-6 border border-neutral-200 rounded-xl">
                            <div className="flex space-x-2">
                                <div>
                                    <ReceiptIcon className="w-4 h-4 text-neutral-500" stroke={1.5} />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500">
                                        {lang.type}
                                    </div>
                                    <div className="text-2xl capitalize">
                                        {data.type.name}
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <div>
                                    <ArrowsDoubleNeSwIcon className="w-4 h-4 text-neutral-500" stroke={1.5} />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500">
                                        {lang.transaction_type}
                                    </div>
                                    <div className="text-2xl">
                                        {data.transaction_type === 0 ? lang.income : lang.expense}
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <div>
                                    <CalendarIcon className="w-4 h-4 text-neutral-500" stroke={1.5} />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500">
                                        {lang.bill_date}
                                    </div>
                                    <div className="text-2xl">
                                        {moment(data.bill_date).format('MMMM DD, YYYY')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <div>
                                    <CalendarIcon className="w-4 h-4 text-neutral-500" stroke={1.5} />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500">
                                        {lang.due_date}
                                    </div>
                                    <div className="text-2xl">
                                        {moment(data.due_date).format('MMMM DD, YYYY')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <div className="w-1/2 p-6 text-sm border topography bg-neutral-800 text-neutral-100 rounded-xl">
                                <div className={`flex items-center justify-between ${data.discount ? 'pb-2' : 'pb-4'}`}>
                                    <div>{lang.dpp}</div>
                                    <div>{Intl.NumberFormat('id-Id', { style: 'currency', currency: data.currency }).format(data.dpp)}</div>
                                </div>
                                {data.discount && (
                                    <div className={`flex items-center justify-between ${data.advance_payment ? 'py-2' : 'pt-2 pb-4'}`}>
                                        <div>{lang.discount}</div>
                                        <div>{Intl.NumberFormat('id-Id', { style: 'currency', currency: data.currency }).format(data.discount)}</div>
                                    </div>
                                )}
                                {data.advance_payment && (
                                    <div className={`flex items-center justify-between ${data.ppn_percentage ? 'py-2' : 'pt-2 pb-4'}`}>
                                        <div>{lang.advance_payment}</div>
                                        <div>{Intl.NumberFormat('id-Id', { style: 'currency', currency: data.currency }).format(data.advance_payment)}</div>
                                    </div>
                                )}
                                {data.ppn_percentage ? (
                                    <>
                                        <div className="flex items-center justify-between py-2">
                                            <div>{lang.ppn}</div>
                                            <div>{Intl.NumberFormat('id-Id', { style: 'currency', currency: data.currency }).format(data.ppn)}</div>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 pb-4">
                                            <div>{lang.ppn_percentage}</div>
                                            <div>{`${data.ppn_percentage}%`}</div>
                                        </div>
                                    </>
                                ) : <></>}
                                <div className="flex items-center justify-between pt-4 text-lg font-semibold border-t">
                                    <div>{lang.grand_total}</div>
                                    <div>{Intl.NumberFormat('id-Id', { style: 'currency', currency: data.currency }).format(data.grand_total)}</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="font-medium">
                                        {lang.status}
                                    </div>
                                    <span className={`${data.status === 'outstanding' ? 'text-yellow-800 bg-yellow-100' : data.status === 'paid' ? 'text-blue-800 bg-blue-100' : data.status === 'settled' ? 'text-green-800 bg-green-100' : (data.status === 'waiting' ? 'text-neutral-800 bg-neutral-100' : 'text-red-800 bg-red-100')} capitalize inline-flex px-2 text-xs font-semibold leading-5 rounded-full`}>
                                        {data.status}
                                    </span>
                                </div>

                                {data.invoice && (
                                    <div className="space-y-2">
                                        <div className="font-medium">
                                            {lang.invoice}
                                        </div>
                                        <Link to={`/invoice/${data.invoice.invoice_number}`} state={{ back: number, transition: 'slide' }} className="inline-flex items-center space-x-2 text-xs underline">
                                            <div>
                                                {data.invoice.invoice_number}
                                            </div>
                                            <div>
                                                <ArrowRightIcon />
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 space-y-6 text-xs border rounded-xl border-neutral-200">
                            {/* Currency */}
                            <Divider content={`${lang.currency_detail}`} className="font-medium" />
                            <div className="flex space-x-2">
                                <div>
                                    <DollarIcon className="w-4 h-4" stroke={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-medium">{lang.currency}</div>
                                    <div className="uppercase">{data.currency}</div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div>
                                    <TrendingUpIcon className="w-4 h-4" stroke={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-medium">{lang.exchange_rate}</div>
                                    <div>{data.rate}</div>
                                </div>
                            </div>

                            {/* Payor or Payee */}
                            <Divider content={(data.type.code === 'po' || data.type.code === 'rt-po') ? lang.supplier_detail : lang.customer_detail} className="font-medium" />
                            <div className="flex space-x-2">
                                <div>
                                    <AsteriskIcon className="w-4 h-4" stroke={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-medium">{lang.code}</div>
                                    <div>{data.payor_or_payee_code}</div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div>
                                    <UserCircleIcon className="w-4 h-4" stroke={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-medium">{lang.name}</div>
                                    <div>{(data.type.code === 'po' || data.type.code === 'rt-po') ? data.supplier.name : data.customer.name}</div>
                                </div>
                            </div>
                            {((data.type.code === 'po' || data.type.code === 'rt-po') ? data.supplier.email : data.customer.email) && (
                                <div className="flex space-x-2">
                                    <div>
                                        <MailIcon className="w-4 h-4" stroke={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="font-medium">{lang.email}</div>
                                        <div>{(data.type.code === 'po' || data.type.code === 'rt-po') ? data.supplier.email : data.customer.email}</div>
                                    </div>
                                </div>
                            )}

                            {/* Timestamp */}
                            <Divider content="Timestamp" className="font-medium" />
                            <div className="flex space-x-2">
                                <div>
                                    <CalendarPlusIcon className="w-4 h-4" stroke={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-medium">{lang.created_at}</div>
                                    <div>{moment(data.created_at).format('MMMM DD, YYYY')}</div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div>
                                    <CalendarPlusIcon className="w-4 h-4" stroke={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-medium">{lang.created_by}</div>
                                    <div>{data.created_by}</div>
                                </div>
                            </div>
                            {data.updated_by && (
                                <>
                                    <div className="flex space-x-2">
                                        <div>
                                            <CalendarIcon className="w-4 h-4" stroke={1.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium">{lang.updated_at}</div>
                                            <div>{moment(data.updated_at).format('MMMM DD, YYYY')}</div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <div>
                                            <CalendarIcon className="w-4 h-4" stroke={1.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium">{lang.updated_by}</div>
                                            <div>{data.updated_by}</div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Note */}
                            {data.note && (
                                <>
                                    <Divider content={lang.note} className="font-medium" />
                                    <div className="flex space-x-2">
                                        <div>
                                            <NoteIcon className="w-4 h-4" stroke={1.5} />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="font-medium">{lang.note}</div>
                                            <div>
                                                {data.note}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Transition>
            </div>
        </AppLayout>
    )
}

export default BillDetail