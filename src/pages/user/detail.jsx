import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import {
    CalendarIcon,
    LockAccessIcon,
    WaveIcon
} from "components/icons"

import AppLayout from "layouts/app-layout"
import Transition from "components/transition"
import axios from 'axios'
import moment from "moment/moment"
import { useLayoutEffect } from "react"
import { Divider } from "components"
import { lang } from "config"

const UserDetail = () => {
    useLayoutEffect(() => {
        const getPrevRouteState = async () => {
            setPrevRouteState({
                back: location.state.back,
                transition: location.state.transition
            })
        }
        const fetch = async () => {
            await axios.get(`${process.env.REACT_APP_GLOBAL_API_URL}/user/${phone}`)
                .then(res => {
                    setData(res.data)
                })
        }
        getPrevRouteState()
        fetch()
    }, [])

    const phone = useParams().phone
    const navigate = useNavigate()
    const location = useLocation()

    const [prevRouteState, setPrevRouteState] = useState({})
    const [data, setData] = useState({})

    return (
        <AppLayout title={data.name}>
            <div className="p-8 space-y-16">
                <div>
                    {prevRouteState?.back && (
                        <button className="transition hover:opacity-50" onClick={() => navigate(-1, { state: { transition: "slide" } })}>
                            <motion.h3 layout transition={{ duration: .5, type: "tween" }} layoutId={prevRouteState?.back} className="text-sm">{prevRouteState?.back}</motion.h3>
                        </button>
                    )}
                    <Transition reversed>
                        <h1 className="text-3xl font-medium">
                            {data.name}
                        </h1>
                    </Transition>
                </div>
                <Transition reversed>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="overflow-hidden rounded-full ring-1 ring-neutral-900 ring-offset-2">
                                <img src={`https://ui-avatars.com/api/?name=${data.name}&format=svg&background=262626&color=f5f5f5`} className="w-12 h-12" />
                            </div>
                            <div>
                                <div className="font-medium">{data.name}</div>
                                <div className="text-xs">{data.phone}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-6 border border-neutral-200 rounded-xl">
                            <div className="flex space-x-2">
                                <div>
                                    <WaveIcon className="w-4 h-4 text-neutral-500" stroke={1.5} />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500">
                                        Total Role{data.roles?.length > 1 ? 's' : ''}
                                    </div>
                                    <div className="text-2xl capitalize">
                                        {data.roles ? `${data.roles.length} ${lang.role}${data.roles.length > 1 ? lang.pluralization : lang.pluralization} ${lang.assigned}` : lang.no_role}
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <div>
                                    <CalendarIcon className="w-4 h-4 text-neutral-500" stroke={1.5} />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500">
                                        {lang.joined_at}
                                    </div>
                                    <div className="text-2xl">
                                        {moment(data.created_at).format('MMMM DD, YYYY')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-2">
                                <div>
                                    <CalendarIcon className="w-4 h-4 text-neutral-500" stroke={1.5} />
                                </div>
                                <div>
                                    <div className="text-xs text-neutral-500">
                                        {lang.updated_at}
                                    </div>
                                    <div className="text-2xl">
                                        {moment(data.updated_at).format('MMMM DD, YYYY')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 space-y-6 text-xs border rounded-xl border-neutral-200">
                            <div className="flex space-x-2">
                                <div>
                                    <LockAccessIcon className="w-4 h-4" stroke={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-medium">{lang.roles}</div>
                                    {data.roles?.map(row => (
                                        <div>{row.name}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </AppLayout>
    )
}

export default UserDetail