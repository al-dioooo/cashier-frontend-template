import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import AuthLayout from "layouts/auth-layout"
import ErrorMessage from "components/forms/error-message"
import Input from "components/forms/input"
import SelectCountry from "components/forms/select-country"
import { generatePhoneNumber } from "helpers/phone-helper"
import InputOTPModal from "./input-otp"
import toast from "react-hot-toast"
import nProgress from "nprogress"
import { lang } from "config"

const Register = ({ title }) => {
    const navigate = useNavigate()

    const [countries, setCountries] = useState([{ id: 1, name: "" }])

    const [country, setCountry] = useState({
        icon: "assets/flags/id.svg",
        id: 100,
        iso: "ID",
        iso3: "IDN",
        name: "INDONESIA",
        nicename: "Indonesia",
        numcode: 360,
        phonecode: 62
    })
    const [phone, setPhone] = useState(undefined)
    const [name, setName] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [passwordConfirmation, setPasswordConfirmation] = useState(undefined)

    const [isOpenOTPModal, setIsOpenOTPModal] = useState(false)

    const [errors, setErrors] = useState({})

    useEffect(() => {
        const getCountry = async () => {
            await axios.get(`${process.env.REACT_APP_GLOBAL_API_URL}/country`).then((res) => {
                setCountries(res.data.data.country)
            })
        }

        getCountry()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        nProgress.start()

        axios.post(`${process.env.REACT_APP_GLOBAL_API_URL}/register`, {
            application_id: 2,
            country_id: country?.id,
            phone: phone ? generatePhoneNumber(country?.phonecode, phone) : undefined,
            name,
            password,
            password_confirmation: passwordConfirmation
        }).then((response) => {
            setIsOpenOTPModal(true)
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

    const handleSuccess = () => {
        setIsOpenOTPModal(false)
        nProgress.done()

        setTimeout(() => {
            navigate('/login')
        }, 300)
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
                            {lang.hey_there}
                        </h2>
                        <p className="mt-2 text-sm text-center text-neutral-600">
                            {lang.lets_sign_up}
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
                                <label for="name" className="block text-xs text-neutral-700">{lang.name}</label>
                                <Input onChange={(e) => setName(e.target.value)} value={name} error={errors.name} id="name" />
                                <ErrorMessage error={errors.name} />
                            </div>

                            <div>
                                <label for="password" className="block text-xs text-neutral-700">{lang.password}</label>
                                <Input onChange={(e) => setPassword(e.target.value)} value={password} error={errors.password} id="password" type="password" />
                                <ErrorMessage error={errors.password} />
                            </div>

                            <div>
                                <label for="password_confirmation" className="block text-xs text-neutral-700">{lang.password_confirmation}</label>
                                <Input onChange={(e) => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} error={errors.password} id="password_confirmation" type="password" />
                            </div>

                            <div className="flex justify-end text-xs">
                                <span>{lang.already_have_account} {lang.sign_in} <Link to="/login" className="underline underline-offset-2">{lang.here}</Link>.</span>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="items-center w-full px-6 py-3 text-sm text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                                <span>{lang.sign_up}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <InputOTPModal data={phone ? generatePhoneNumber(country?.phonecode, phone) : undefined} isOpen={isOpenOTPModal} onSuccess={handleSuccess} />
            {/* <InputOTPModal data={phone ? generatePhoneNumber(country?.phonecode, phone) : undefined} isOpen={isOpenOTPModal} /> */}
        </AuthLayout>
    )
}

export default Register