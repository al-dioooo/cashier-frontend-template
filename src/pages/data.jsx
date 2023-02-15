import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import AppLayout from "layouts/app-layout"
import Transition from "components/transition"
import Create from "pages/data/create"
import Filter from "pages/data/filter"
import nProgress from "nprogress"
import { lang } from "config"
import useUsers from "repositories/user"

const Data = ({ title }) => {
    // React router navigate hook
    const navigate = useNavigate()

    // Query parameters
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')
    const user = searchParams.get('user')
    const email = searchParams.get('email')
    const phone = searchParams.get('phone')

    // User data
    const { data: users, isLoading: isLoadingUsers, mutate: mutateUsers } = useUsers({
        search,
        user,
        email,
        phone,
    })

    // Watch changes on petty cash data and loading state
    useEffect(() => {
        if (search === "") {
            navigate(``, { replace: true })
        }

        if (isLoadingUsers) {
            nProgress.start()
        } else {
            nProgress.done()
        }
    }, [users, isLoadingUsers])

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
                                    <input onChange={(e) => setSearchParams({ search: e.target.value })} value={searchParams.get('search')} type="text" placeholder={`${lang.search} ${lang.data}`} autoComplete="off" className="w-64 py-3 pl-8 pr-4 text-xs transition border border-neutral-200 focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200" />
                                </div>
                                <Filter onSubmit={updateFilter} onRemove={removeFilter} data={Object.fromEntries(Object.entries({ user, email, phone }).filter(([_, v]) => v != null))} />
                            </div>
                            <div>
                                <Create success={mutateUsers} />
                            </div>
                        </div>
                        <div className="overflow-x-auto border border-neutral-200 rounded-xl">
                            <table className="min-w-full overflow-x-auto divide-y divide-neutral-200">
                                <thead className="bg-neutral-50 rounded-t-3xl">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.user}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.email}</th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.phone}</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-neutral-200">
                                    {/* When loading */}
                                    {isLoadingUsers && (
                                        <tr className="text-center">
                                            <td colSpan="10" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {lang.loading_data}
                                            </td>
                                        </tr>
                                    )}

                                    {/* When there are no list available */}
                                    {users?.length === 0 && !search && !isLoadingUsers && (
                                        <tr className="text-center">
                                            <td colSpan="10" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {lang.no_data}
                                            </td>
                                        </tr>
                                    )}

                                    {/* When there are no list available on searching */}
                                    {users?.length === 0 && search && !isLoadingUsers && (
                                        <tr className="text-center">
                                            <td colSpan="10" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {lang.no_result}
                                            </td>
                                        </tr>
                                    )}

                                    {users?.length > 0 && users?.map(row => (
                                        <tr>
                                            <td className="px-6 py-4 text-xs whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <img class="object-cover w-10 h-10 rounded-full" src={`https://ui-avatars.com/api/?name=${row.name}`} alt={`${row.name} Profile Photo`} />
                                                    <div class="ml-4 flex flex-col">
                                                        <span className="font-medium text-neutral-900">{row.name}</span>
                                                        <span className="text-neutral-500">{`@${row.username}`}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {row.email}
                                            </td>
                                            <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                                {row.phone}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Transition>
            </div>
        </AppLayout>
    )
}

export default Data