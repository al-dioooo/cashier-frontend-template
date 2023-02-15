import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import AuthLayout from "layouts/auth-layout"
import { useLayoutEffect } from "react"
import ErrorMessage from "components/forms/error-message"
import SelectCountry from "components/forms/select-country"
import Input from "components/forms/input"
import { useAuth } from "contexts/auth-context"
import { generatePhoneNumber } from "helpers/phone-helper"
import Checkbox from "components/forms/checkbox"
import nProgress from "nprogress"
import toast from "react-hot-toast"
import { useEffect } from "react"
import { lang } from "config"

const Login = ({ title }) => {
    const { setSession, removeCurrentBranch } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [countries, setCountries] = useState([{ id: 1, name: "" }])

    const [country, setCountry] = useState({
        icon: "assets/flags/id.svg",
        id: 1,
        iso: "ID",
        iso3: "IDN",
        name: "INDONESIA",
        nicename: "Indonesia",
        numcode: 360,
        phonecode: 62
    })
    const [phone, setPhone] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [remember, setRemember] = useState(0)

    const [errors, setErrors] = useState({})

    useEffect(() => {
        const getCountry = async () => {
            await axios.get(`${process.env.REACT_APP_GLOBAL_API_URL}/country`).then((res) => {
                setCountries(res.data.data.country)
            })
        }

        getCountry()
    }, [])

    const handleChangeRemember = () => {
        if (remember === 0) {
            setRemember(1)
        } else {
            setRemember(0)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        nProgress.start()

        setErrors({})

        axios.post(`${process.env.REACT_APP_GLOBAL_API_URL}/login`, {
            phone: phone ? generatePhoneNumber(country?.phonecode, phone) : undefined,
            password,
            remember_me: remember
        }).then((response) => {
            removeCurrentBranch()
            setSession(response.data.data.token, response.data.data.user)
            if (location.state?.back) {
                if (location.state.back !== '/no-role' && location.state.back !== '/branch/select' && location.state.back !== location.pathname) {
                    navigate(location.state?.back ?? 0)
                } else {
                    navigate(0)
                }
            } else {
                navigate(0)
            }
            toast.success(response.data.message)
            nProgress.done()
        }).catch((error) => {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
            }
            toast.error(error.response.data.message)
            console.log(error)
            nProgress.done()
        })
    }

    return (
        <AuthLayout title={title}>
            <div className="flex items-center justify-center w-full px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div className="flex justify-center">
                            <div className="p-4 text-white rounded-full bg-neutral-800">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <circle cx="8" cy="15" r="4"></circle>
                                    <line x1="10.85" y1="12.15" x2="19" y2="4"></line>
                                    <line x1="18" y1="5" x2="20" y2="7"></line>
                                    <line x1="15" y1="8" x2="17" y2="10"></line>
                                </svg>
                            </div>
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                            {lang.welcome_back}
                        </h2>
                        <p className="mt-2 text-sm text-center text-neutral-600">
                            {lang.please_sign_in}
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label for="phone" className="block text-xs text-neutral-700">{lang.whatsapp_number}</label>
                                <div className="flex space-x-2">
                                    <div className="w-2/3">
                                        <SelectCountry onChange={value => setCountry(value)} selection={countries} value={country} display="phonecode" />
                                    </div>
                                    <Input type="number" onChange={e => setPhone(e.target.value)} value={phone} error={errors.phone} id="phone" />
                                </div>
                                <ErrorMessage error={errors.phone} />
                            </div>

                            <div>
                                <label for="password" className="block text-xs text-neutral-700">{lang.password}</label>
                                <Input onChange={(e) => setPassword(e.target.value)} value={password} error={errors.password} id="password" type="password" />
                                <ErrorMessage error={errors.password} />
                            </div>

                            <div className="flex justify-between text-xs">
                                <div className="flex items-end">
                                    <div>
                                        <Checkbox onChange={handleChangeRemember} checked={remember} id="remember_me" name="remember_me" error={errors.remember_me} />
                                    </div>
                                    <div className="ml-2">
                                        <label htmlFor="remember_me">
                                            {lang.remember_me}
                                        </label>
                                    </div>
                                </div>
                                <span>{lang.dont_have_account} {lang.sign_up} <Link to="/register" className="underline underline-offset-2">{lang.here}</Link>.</span>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="items-center w-full px-6 py-3 text-sm text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                                <span>{lang.sign_in}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login