import { useState } from 'react'
import { Modal } from 'components'
import axios from 'axios'
import ErrorMessage from 'components/forms/error-message'
import Input from 'components/forms/input'
import Label from 'components/forms/label'
import nProgress from 'nprogress'
import toast from 'react-hot-toast'
import SelectCountry from 'components/forms/select-country'
import { lang } from 'config'
import { useEffect } from 'react'
import { generatePhoneNumber, removeCountryCodeFromPhoneNumber } from 'helpers/phone-helper'

const Content = ({ data, success }) => {
    const [name, setName] = useState(data?.name)
    const [phone, setPhone] = useState(data?.phone)

    const [country, setCountry] = useState({})

    const [countries, setCountries] = useState([{ id: 1, name: "" }])

    const [errors, setErrors] = useState({})

    useEffect(() => {
        const getCountry = async () => {
            await axios.get(`${process.env.REACT_APP_GLOBAL_API_URL}/country`).then((res) => {
                const countryResponse = res.data.data.country
                const countryData = countryResponse.find((row) => row.id === data?.country_id)

                setCountries(countryResponse)
                setCountry(countryData)
                setPhone(removeCountryCodeFromPhoneNumber(data?.phone, countryData?.phonecode))
            })
        }

        getCountry()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        nProgress.start()

        axios.patch(`${process.env.REACT_APP_GLOBAL_API_URL}/user/update`, {
            name,
            initial_phone: data?.phone,
            country_id: country?.id,
            phone: phone ? generatePhoneNumber(country?.phonecode, phone) : undefined,
        }).then((response) => {
            success()
            toast.success(response.data.message)
        }).catch(error => {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors)
            }
            toast.error(error.response.data.message)
            console.log(error.response)
            nProgress.done()
        })
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label for="phone" className="block text-xs text-neutral-700">{lang.whatsapp_number}</label>
                    <div className="flex space-x-2">
                        <div className="w-2/3">
                            <SelectCountry onChange={(value) => setCountry(value)} selection={countries} value={country} display="phonecode" />
                        </div>
                        <Input type="number" onChange={e => setPhone(e.target.value)} value={phone} error={errors.phone} id="phone" />
                    </div>
                    <ErrorMessage error={errors.phone} />
                </div>

                <div>
                    <Label htmlFor="name" value={lang.name} />
                    <Input onChange={e => setName(e.target.value)} value={name} id="name" error={errors.name} />
                    <ErrorMessage error={errors.name} />
                </div>
            </div>
            <div className="text-xs">
                <button type="submit" className="items-center px-6 py-3 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                    <span>{lang.update}</span>
                </button>
            </div>
        </form>
    )
}

const Edit = ({ data, onSuccess }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleSuccess = () => {
        closeModal()
        onSuccess()
    }

    return (
        <>
            <button onClick={openModal} class="inline-flex items-center p-1 text-white transition bg-neutral-800 rounded-full active:hover:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                </svg>
            </button>
            <Modal size="3xl" isOpen={isOpen} onClose={closeModal} title={`${lang.edit} ${lang.data}`} content={<Content data={data} success={handleSuccess} />} />
        </>
    )
}

export default Edit