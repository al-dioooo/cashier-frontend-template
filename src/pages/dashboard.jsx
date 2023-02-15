import { useEffect, useState } from "react"
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import AppLayout from "layouts/app-layout"
import Transition from "components/transition"
import { lang } from "config"

const Dashboard = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    
    // Get data from loader
    const data = useLoaderData()
    
    const [transition, setTransition] = useState(location.state?.transition)

    // Clear cache state and reload page
    useEffect(() => {
        if (location.state?.cache === 'clear') {
            window.history.replaceState({}, document.title)
            navigate(0)
        }
    }, [])

    return (
        <AppLayout title={props.title}>
            <div className="p-8 space-y-16">
                <div>
                    <button disabled className="pointer-events-none">
                        <Link to={location.pathname} className="cursor-default">
                            <motion.h1 layout transition={{ duration: .5, type: "tween" }} layoutId={props.title} className="text-3xl font-medium">
                                {props.title}
                            </motion.h1>
                        </Link>
                    </button>
                </div>
                <Transition type={transition}>
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <span className="text-sm font-medium">{lang.statistic}</span>
                            <div className="flex space-x-8 overflow-x-auto rounded-xl">
                                <div className="flex flex-col justify-between flex-shrink-0 w-56 h-56 overflow-hidden text-xs topography rounded-xl bg-neutral-200">
                                    <div className="p-4 font-medium">{lang.petty_cash}</div>
                                    <div className="p-4 bg-neutral-800 bg-opacity-10 backdrop-blur-[1.5px]">
                                        <div>Total data</div>
                                        <div className="text-2xl font-medium">{`${data.petty_cash} data${data.petty_cash > 1 ? lang.pluralization : ''}`}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between flex-shrink-0 w-56 h-56 overflow-hidden text-xs topography rounded-xl bg-neutral-200">
                                    <div className="p-4 font-medium">{lang.bill}</div>
                                    <div className="p-4 bg-neutral-800 bg-opacity-10 backdrop-blur-[1.5px]">
                                        <div>Total data</div>
                                        <div className="text-2xl font-medium">{`${data.bill} data${data.bill > 1 ? lang.pluralization : ''}`}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between flex-shrink-0 w-56 h-56 overflow-hidden text-xs topography rounded-xl bg-neutral-200">
                                    <div className="p-4 font-medium">{lang.invoice}</div>
                                    <div className="p-4 bg-neutral-800 bg-opacity-10 backdrop-blur-[1.5px]">
                                        <div>Total data</div>
                                        <div className="text-2xl font-medium">{`${data.invoice} data${data.invoice > 1 ? lang.pluralization : ''}`}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between flex-shrink-0 w-56 h-56 overflow-hidden text-xs topography rounded-xl bg-neutral-200">
                                    <div className="p-4 font-medium">{lang.transaction}</div>
                                    <div className="p-4 bg-neutral-800 bg-opacity-10 backdrop-blur-[1.5px]">
                                        <div>Total data</div>
                                        <div className="text-2xl font-medium">{`${data.transaction} data${data.transaction > 1 ? lang.pluralization : ''}`}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between flex-shrink-0 w-56 h-56 overflow-hidden text-xs topography rounded-xl bg-neutral-200">
                                    <div className="p-4 font-medium">{lang.customer}</div>
                                    <div className="p-4 bg-neutral-800 bg-opacity-10 backdrop-blur-[1.5px]">
                                        <div>Total data</div>
                                        <div className="text-2xl font-medium">{`${data.customer} data${data.customer > 1 ? lang.pluralization : ''}`}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between flex-shrink-0 w-56 h-56 overflow-hidden text-xs topography rounded-xl bg-neutral-200">
                                    <div className="p-4 font-medium">{lang.supplier}</div>
                                    <div className="p-4 bg-neutral-800 bg-opacity-10 backdrop-blur-[1.5px]">
                                        <div>Total data</div>
                                        <div className="text-2xl font-medium">{`${data.supplier} data${data.supplier > 1 ? lang.pluralization : ''}`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {data.transaction > 0 && (
                            <div className="space-y-2">
                                <span className="text-sm font-medium">{lang.recent_transaction}</span>
                                <div className="flex space-x-8 overflow-x-auto rounded-xl">
                                    {data.transactions.map(row => (
                                        <div className="flex flex-col justify-between flex-shrink-0 w-full max-w-md p-4 overflow-hidden border rounded-xl">
                                            <div className="flex justify-between text-lg font-medium">
                                                <div>
                                                    <div>{row.branch?.name}</div>
                                                    <div className="text-xs font-normal">{row.transaction_number}</div>
                                                </div>
                                                <div>{Intl.NumberFormat('id-Id', { style: 'currency', currency: row.currency }).format(row.grand_total)}</div>
                                            </div>
                                            <div className="mt-4 text-xs font-medium">{(row.type?.code === 'po' || row.type?.code === 'rt-po') ? row.supplier?.name : row.customer?.name}</div>
                                            <div className="text-xs">{row.transaction_type === 0 ? "Income" : "Expense"}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Transition>
            </div>
        </AppLayout>
    )
}

export default Dashboard