import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import AppLayout from "layouts/app-layout"
import Transition from "components/transition"
import axios from 'axios'
import moment from "moment/moment"
import Edit from "pages/user/edit"
import Delete from "pages/user/delete"
import Filter from "pages/user/filter"
import nProgress from "nprogress"
import { Pagination } from "components"
import { lang } from "config"

const User = (props) => {
    const [users, setUsers] = useState({ data: [] })
    const [searchParams, setSearchParams] = useSearchParams()

    const [trigger, setTrigger] = useState(false)

    const navigate = useNavigate()

    const search = searchParams.get('search')
    const name = searchParams.get('name')
    const phone = searchParams.get('phone')
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const page = searchParams.get('page')

    useEffect(() => {
        if (search === "") {
            navigate(``, { replace: true })
        }

        nProgress.start()

        const fetch = async () => {
            await axios.get(`${process.env.REACT_APP_GLOBAL_API_URL}/user`, {
                params: {
                    search,
                    name,
                    phone,
                    from,
                    to,
                    page
                }
            }).then((res) => {
                setUsers(res.data)
            }).then(() => {
                nProgress.done()
            })
        }
        fetch()
    }, [searchParams, trigger])

    const handleSuccess = () => {
        setTrigger(!trigger)
    }

    const updateFilter = (value) => {
        setSearchParams(value)
    }

    const resetFilter = () => {
        setSearchParams({})
    }

    return (
        <AppLayout title={props.title}>
            <div className="p-8 space-y-16">
                <div>
                    <button className="cursor-default">
                        <motion.h1 layout transition={{ duration: .5, type: "tween" }} layoutId={props.title} className="text-3xl font-medium">
                            {props.title}
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
                                    <input onChange={(e) => setSearchParams({ search: e.target.value })} value={searchParams.get('search')} type="text" placeholder={`${lang.search} ${lang.user}`} autoComplete="off" className="w-64 py-3 pl-8 pr-4 text-xs transition border border-neutral-200 focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200" />
                                </div>
                                <Filter onSubmit={updateFilter} onReset={resetFilter} data={Object.fromEntries(Object.entries({ name, phone, from, to }).filter(([_, v]) => v != null))} />
                            </div>
                        </div>
                        <div className="overflow-x-auto border border-neutral-200 rounded-xl">
                            <table className="min-w-full overflow-x-auto divide-y divide-neutral-200">
                                <thead className="bg-neutral-50 rounded-t-3xl">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.user}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.role}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.phone}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.joined_at}</th>
                                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Action</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-neutral-200">
                                    {/* When there are no list available */}
                                    {!nProgress.isRendered() && users.data.length === 0 && (
                                        <tr className="text-center">
                                            <td colSpan="6" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                <div className="w-6 h-6 border animate-spinner"></div>
                                            </td>
                                        </tr>
                                    )}

                                    {nProgress.isRendered() && users.data.length === 0 && (
                                        <tr className="text-center">
                                            <td colSpan="6" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {lang.no_data}
                                            </td>
                                        </tr>
                                    )}

                                    {/* When there are no list available on searching */}
                                    {/* <tr className="text-center">
                                        <td colSpan="6" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                            No result
                                        </td>
                                    </tr> */}
                                    {users.data.length > 0 && users.data.map(row => (
                                        <tr key={row.id}>
                                            <td className="px-6 py-4 text-xs font-medium text-neutral-900 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <img class="object-cover w-10 h-10 rounded-full" src={`https://ui-avatars.com/api/?name=${row.name}`} alt={`${row.name} Profile Photo`} />
                                                    <div class="ml-4 font-medium text-neutral-900">
                                                        {row.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {row.roles.length ? (
                                                    <div className="inline-flex items-center space-x-2">
                                                        <span>{row.roles[0].name}</span>
                                                        {row.roles.length > 1 && (
                                                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                                {`${row.roles.length - 1}+`}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : "-"}
                                            </td>
                                            <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {row.phone}
                                            </td>
                                            <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {moment(row.created_at).format('MMMM D, YYYY')}
                                            </td>
                                            <td class="px-6 py-4 text-xs font-medium text-right whitespace-nowrap">
                                                <div class="inline-flex items-center space-x-2">
                                                    <Link to={row.phone} state={{ back: props.title, transition: 'slide' }} class="inline-flex items-center p-1 text-white transition bg-neutral-800 rounded-full active:hover:scale-90">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <circle cx={12} cy={12} r={2}></circle>
                                                            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"></path>
                                                        </svg>
                                                    </Link>

                                                    <Edit data={row} onSuccess={handleSuccess} />

                                                    <Delete data={row} onSuccess={handleSuccess} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={users.links} from={users.from} to={users.to} total={users.total} />
                    </div>
                </Transition>
            </div>
        </AppLayout>
    )
}

export default User