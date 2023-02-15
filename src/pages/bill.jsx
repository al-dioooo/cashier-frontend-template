import { useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import AppLayout from "layouts/app-layout"
import Transition from "components/transition"
import moment from "moment/moment"
import Filter from "pages/bill/filter"
import nProgress from "nprogress"
import { useAuth } from "contexts/auth-context"
import useBills from "repositories/bill"
import SupplierIcon from "components/icons/supplier"
import { UsersIcon } from "components/icons"
import { Pagination } from "components"
import { getCurrentBranch } from "helpers/auth-helper"
import { lang } from "config"

const Bill = ({ title }) => {
    // Logged in user ability
    const { isSuper, currentBranch } = useAuth()

    // React router navigate hook
    const navigate = useNavigate()

    // Query parameters
    const [searchParams, setSearchParams] = useSearchParams()

    const page = searchParams.get('page')
    const search = searchParams.get('search')
    const billNumber = searchParams.get('bill_number')
    const customer = searchParams.get('customer')
    const transactionType = searchParams.get('transaction_type')
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const grandTotal = searchParams.get('grand_total')
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    // Bill data
    const { data: bills, isLoading, mutate } = useBills({
        // branch: isSuper() ? undefined : currentBranch.id,
        page,
        search,
        bill_number: billNumber,
        transaction_type: transactionType,
        type,
        status,
        grand_total: grandTotal,
        from,
        to
    })

    // Watch changes on bill data and loading state
    useEffect(() => {
        if (search === "") {
            navigate(``, { replace: true })
        }

        if (isLoading) {
            nProgress.start()
        } else {
            nProgress.done()
        }
    }, [bills, isLoading])

    // Data filter handlers
    const updateFilter = (value) => {
        setSearchParams(value)
    }

    const removeFilter = () => {
        setSearchParams({})
    }

    return (
        <AppLayout title={title}>
            <div className="p-8 space-y-16">
                <div>
                    <button className="cursor-default">
                        <motion.h1 layout transition={{ duration: .5, type: "tween" }} layoutId={title} className="text-3xl font-medium">
                            {title}
                        </motion.h1>
                    </button>
                </div>
                <Transition>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <circle cx={10} cy={10} r={7}></circle>
                                            <line x1={21} y1={21} x2={15} y2={15}></line>
                                        </svg>
                                    </div>
                                    <input onChange={(e) => setSearchParams({ search: e.target.value })} value={searchParams.get('search')} type="text" placeholder={`${lang.search} ${lang.bill}`} autoComplete="off" className="w-64 py-3 pl-8 pr-4 text-xs transition border border-neutral-200 focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200" />
                                </div>
                                <Filter onSubmit={updateFilter} onRemove={removeFilter} data={Object.fromEntries(Object.entries({ billNumber, customer, transactionType, type, status, grandTotal, from, to }).filter(([_, v]) => v != null))} />
                            </div>
                        </div>
                        <div className="overflow-x-auto border border-neutral-200 rounded-xl">
                            <table className="min-w-full overflow-x-auto divide-y divide-neutral-200">
                                <thead className="bg-neutral-50 rounded-t-3xl">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.bill}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.branch}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.customer_or_supplier}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.type}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.transaction_type}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.grand_total}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.status}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.bill_date}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.due_date}</th>
                                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">{lang.action}</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-neutral-200">
                                    {/* When loading */}
                                    {isLoading && (
                                        <tr className="text-center">
                                            <td colSpan="10" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                Loading data
                                            </td>
                                        </tr>
                                    )}

                                    {/* When there are no list available */}
                                    {bills?.data.length === 0 && !search && !isLoading && (
                                        <tr className="text-center">
                                            <td colSpan="10" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                No list available
                                            </td>
                                        </tr>
                                    )}

                                    {/* When there are no list available on searching */}
                                    {bills?.data.length === 0 && search && !isLoading && (
                                        <tr className="text-center">
                                            <td colSpan="10" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                No result
                                            </td>
                                        </tr>
                                    )}

                                    {bills?.data.length > 0 && bills.data.map(row => (
                                        <tr>
                                            <td className="px-6 py-4 text-xs font-medium text-neutral-900 whitespace-nowrap">
                                                {row.bill_number}
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-neutral-900 whitespace-nowrap">
                                                {row.branch?.name}
                                            </td>
                                            <td class="px-6 py-4 text-xs font-medium text-neutral-900 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <span>
                                                        {(row.type?.code === 'po' || row.type?.code === 'rt-po') ? (
                                                            <SupplierIcon className="w-4 h-4" stroke={1.5} />
                                                        ) : (
                                                            <UsersIcon className="w-4 h-4" stroke={1.5} />
                                                        )}
                                                    </span>
                                                    <span>
                                                        {(row.type?.code === 'po' || row.type?.code === 'rt-po') ? row.supplier?.name : row.customer?.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {row.type?.name}
                                            </td>
                                            <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {row.transaction_type === 0 ? lang.income : lang.expense}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {Intl.NumberFormat('id-Id', { style: 'currency', currency: row.currency }).format(row.grand_total)}
                                            </td>
                                            <td className="px-6 py-4 text-xs capitalize whitespace-nowrap">
                                                <span className={`${row.status === 'outstanding' ? 'text-yellow-800 bg-yellow-100' : row.status === 'paid' ? 'text-blue-800 bg-blue-100' : row.status === 'settled' ? 'text-green-800 bg-green-100' : (row.status === 'waiting' ? 'text-neutral-800 bg-neutral-100' : 'text-red-800 bg-red-100')} inline-flex px-2 text-xs font-semibold leading-5 rounded-full`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {moment(row.bill_date).format('MMMM D, YYYY')}
                                            </td>
                                            <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {moment(row.due_date).format('MMMM D, YYYY')}
                                            </td>
                                            <td class="px-6 py-4 text-xs font-medium text-right whitespace-nowrap">
                                                <div class="inline-flex items-center space-x-2">
                                                    <Link to={{ pathname: encodeURIComponent(row.bill_number) }} state={{ back: title, transition: 'slide' }} class="inline-flex items-center p-1 text-white transition bg-neutral-800 rounded-full active:hover:scale-90">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <circle cx={12} cy={12} r={2}></circle>
                                                            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"></path>
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={bills?.links} from={bills?.from} to={bills?.to} total={bills?.total} />
                    </div>
                </Transition>
            </div>
        </AppLayout>
    )
}

export default Bill