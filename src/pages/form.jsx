import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

import AppLayout from "layouts/app-layout"
import Transition from "components/transition"
import ErrorMessage from "components/forms/error-message"
import toast from "react-hot-toast"
import { useSWRConfig } from "swr"
import nProgress from "nprogress"
import Input from "components/forms/input"
import InputDate from "components/forms/input-date"
import useBranches from "repositories/branch"
import moment from "moment"
import Label from "components/forms/label"
import Checkbox from "components/forms/checkbox"
import InputAmount from "components/forms/input-amount"
import Radio from "components/forms/radio"
import SelectDescription from "components/forms/select-description"
import SelectMultiple from "components/forms/select-multiple"

const Form = ({ title }) => {
    const { cache } = useSWRConfig()

    const location = useLocation()

    const [bill, setBill] = useState(null)
    const [branch, setBranch] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [vehicle, setVehicle] = useState(null)
    const [date, setDate] = useState(null)
    const [method, setMethod] = useState(null)

    const [isOpenOrderListModal, setIsOpenOrderListModal] = useState(false)

    // Selections
    const { data: branchSelection, isLoading: isLoadingBranch } = useBranches({
        paginate: false
    })

    const [error, setError] = useState(false)

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (error) {
            setErrors({
                text: "The text field is required.",
                number: "The number field is required.",
                select: "The select field is required.",
                user: "The user field is required.",
                date: "The date field is required.",
                note: "The note field is required.",
                block: "This field is required.",
                accuracy: "Accuracy must be above zero."
            })
        } else {
            setErrors({})
        }
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault()

        nProgress.start()

        if (error) {
            toast.error('The given data is invalid')
        } else {
            toast.success('Successfully submitted!')
        }

        nProgress.done()
    }

    return (
        <AppLayout title={title}>
            <div className="p-8 space-y-16">
                <div>
                    <button disabled className="pointer-events-none">
                        <Link to={location.pathname} className="cursor-default">
                            <motion.h1 layout transition={{ duration: .5, type: "tween" }} layoutId={title} className="text-3xl font-medium">
                                {title}
                            </motion.h1>
                        </Link>
                    </button>
                </div>
                <Transition type="fade">
                    <div className="space-y-16">
                        <form onSubmit={handleSubmit}>
                            <div className="mt-10 lg:mt-0">
                                <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                                    <div className="lg:col-span-1">
                                        <div>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Title</h3>
                                            <p className="mt-1 text-sm text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae iste obcaecati, aperiam veritatis reprehenderit maiores recusandae consequatur illo</p>
                                        </div>
                                    </div>
                                    <div className="mt-5 lg:col-span-2 lg:mt-0">
                                        <div className="overflow-hidden border rounded-xl">
                                            <div className="px-4 py-5 bg-white lg:p-6">
                                                <div className="grid grid-cols-6 gap-4">
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <Label htmlFor="text" value="Text" />
                                                        <Input placeholder="Placeholder" error={errors.text} id="text" />
                                                        <ErrorMessage error={errors.text} />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <Label htmlFor="number" value="Number" />
                                                        <InputAmount placeholder="Placeholder" error={errors.number} id="number" />
                                                        <ErrorMessage error={errors.number} />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <Label htmlFor="select" value="Select" />
                                                        <select name="select" id="select" className={`${errors.select ? 'border-red-200' : 'border-neutral-200'} block w-full px-2 py-2 mt-1 text-sm transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`}>
                                                            <option value={null} disabled selected>-- Select Data --</option>
                                                            <option value={1}>Data</option>
                                                        </select>
                                                        <ErrorMessage error={errors.select} />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <Label htmlFor="branch" value="Branch" />
                                                        <SelectDescription onChange={() => { }} isLoading={false} title="label" description="description" value={null} keyValue="id" selection={[{ id: 1, label: "Main", description: "Shimotsuma, Ibaraki, Japan" }, { id: 2, label: "Tokyo", description: "Shibuya City, Tokyo, Japan" }]} placeholder="Select Branch" error={errors.branch} />
                                                        <ErrorMessage error={errors.branch} />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <Label htmlFor="user" value="User" />
                                                        <SelectMultiple onChange={() => { }} isLoading={false} title="name" description="phone" keyValue="id" selection={[{ id: 1, name: "Alice Evergarden", phone: "+62 851-7307-5151" }, { id: 2, name: "Alicia Endeavour", phone: "+62 895-1811-8820" }]} placeholder="Select User" error={errors.user} />
                                                        <ErrorMessage error={errors.user} />
                                                    </div>

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <Label htmlFor="date" value="Date" />
                                                        <InputDate id="date" onChange={(value) => setDate(moment(value).format('Y-MM-DD'))} value={Date.parse(date)} selected={Date.parse(date)} error={errors.date} />
                                                        <ErrorMessage error={errors.date} />
                                                    </div>

                                                    <div className="col-span-6">
                                                        <Label htmlFor="note" value="Note" />
                                                        <textarea name="note" id="note" rows="5" className={`${errors.note ? 'border-red-200' : 'border-neutral-200'} block w-full px-2 py-2 mt-1 text-sm transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`}></textarea>
                                                        <ErrorMessage error={errors.note} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden sm:block" aria-hidden="true">
                                <div className="py-5">
                                    <div className="border-t border-gray-200" />
                                </div>
                            </div>

                            <div className="mt-10 sm:mt-0">
                                <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="md:col-span-1">
                                        <div className="px-4 sm:px-0">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Title</h3>
                                            <p className="mt-1 text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum unde cum pariatur nisi, ut nihil, aliquam assumenda aspernatur impedit ducimus odit natus? Doloribus molestias, placeat dolorum aliquid consequuntur inventore nam!</p>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:col-span-2 md:mt-0">
                                        <div className={`${errors.block ? 'border-red-200' : ''} border sm:rounded-3xl`}>
                                            <div className="px-4 py-5 space-y-6 sm:p-6">
                                                <ErrorMessage error={errors.block} />
                                                <fieldset>
                                                    {/* Screen reader only */}
                                                    <legend className="sr-only">Title</legend>

                                                    <div className="text-base font-medium text-gray-900 capitalize" aria-hidden="true">
                                                        Title
                                                    </div>
                                                    <div className="mt-4 space-y-4">
                                                        <div className="flex items-start">
                                                            <div className="flex items-center h-5">
                                                                <Checkbox id="error" onChange={() => setError(!error)} value={error} checked={error} />
                                                            </div>
                                                            <div className="ml-3 text-sm">
                                                                <label htmlFor="error" className={`font-medium text-gray-700 capitalize`}>
                                                                    Error
                                                                </label>
                                                                <p className="text-gray-500">Show error</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset>
                                                    {/* Screen reader only */}
                                                    <legend className="sr-only">Title</legend>

                                                    <div className="text-base font-medium text-gray-900 capitalize" aria-hidden="true">
                                                        Title
                                                    </div>

                                                    <div className="mt-4">
                                                        <Radio onChange={() => { }} keyValue="percentage" title="label" error={errors.accuracy} description="description" selection={[{ percentage: 10, label: "10% Accuracy", description: "Description" }, { percentage: 15, label: "15% Accuracy", description: "Description" }]} />
                                                        <ErrorMessage error={errors.accuracy} />
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 text-xs text-right">
                                <button type="submit" className="items-center px-6 py-3 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                                    <span>Submit</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </Transition>
            </div>
        </AppLayout>
    )
}

export default Form