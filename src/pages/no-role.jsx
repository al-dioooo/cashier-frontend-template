import { useState, useLayoutEffect } from "react"

import axios from 'axios'
import BlankLayout from "layouts/blank-layout"
import { AlertTriangleIcon, ChevronRightIcon } from "components/icons"
import { useAuth } from "contexts/auth-context"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { lang } from "config"

const NoRole = ({ title }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            await axios.get(`${process.env.REACT_APP_GLOBAL_API_URL}/user?super=only&paginate=false`).then((res) => {
                setUsers(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }

        getUsers()
    }, [])

    const logoutHandler = () => {
        logout()
        navigate(0, { replace: true })
    }

    return (
        <BlankLayout title={title}>
            <div className="flex items-center justify-center w-full px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div className="flex justify-center">
                            <div className="p-4 text-white rounded-full bg-neutral-800">
                                <AlertTriangleIcon className="w-8 h-8" />
                            </div>
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                            {lang.no_role}
                        </h2>
                        <p className="mt-2 text-sm text-center text-neutral-600">
                            {lang.please_contact_super_admin}
                        </p>
                    </div>
                    <div className="mt-8 space-y-6">
                        <div className="flex flex-col space-y-4">
                            {users?.map(row => (
                                <>
                                    <a className="group" target="_blank" href={`https://wa.me/${row.phone}?text=Halo, Saya baru saja daftar di aplikasi Kasir. Tolong tambahkan role ke akun Saya.%0A%0ANama: ${user?.name}%0ANo. Telepon: ${user?.phone}`}>
                                        <div className="flex items-center justify-between px-5 py-4 text-sm transition bg-white border cursor-pointer rounded-xl group-hover:ring-1 group-hover:ring-offset-2 group-hover:ring-neutral-800 group-active:hover:scale-95">
                                            <div>
                                                <p className="font-medium text-neutral-900">{row.name}</p>
                                                <span className="inline text-neutral-500">{`+${row.phone}`}</span>
                                            </div>
                                            <div className="p-2 text-white rounded-full bg-neutral-800">
                                                <ChevronRightIcon className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </a>
                                </>
                            ))}
                        </div>

                        <div className="flex justify-center w-full">
                            <button onClick={logoutHandler} className="text-sm text-neutral-600">
                                {lang.logout}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </BlankLayout>
    )
}

export default NoRole