import { useLoaderData, useNavigate } from "react-router-dom"

import BlankLayout from "layouts/blank-layout"
import BranchRadio from "components/forms/branch-radio"

import { BranchIcon } from "components/icons"
import { useState } from "react"
import { useAuth } from "contexts/auth-context"
import nProgress from "nprogress"
import { lang } from "config"

const SelectBranch = ({ title }) => {
    const { setCurrentBranch } = useAuth()

    const [branch, setBranch] = useState({})

    const navigate = useNavigate()
    const data = useLoaderData()

    const handleSelect = (e) => {
        nProgress.start()
        e.preventDefault()

        setCurrentBranch(branch)

        navigate(0, { replace: true })
        nProgress.done()
    }

    return (
        <BlankLayout title={title}>
            <div className="flex items-center justify-center w-full px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div className="flex justify-center">
                            <div className="p-4 text-white rounded-full bg-neutral-800">
                                <BranchIcon className="w-8 h-8" />
                            </div>
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                            {lang.select_branch}
                        </h2>
                        <p className="mt-2 text-sm text-center text-neutral-600">
                            {lang.in_order_to_continue_please_select}
                        </p>
                    </div>
                    <div className="mt-8 space-y-6">
                        <BranchRadio onChange={(value) => setBranch(value)} selection={data} />
                        <div>
                            <button onClick={handleSelect} disabled={!branch} className={`${!branch ? 'bg-neutral-600' : 'bg-neutral-800 active:hover:scale-90'} items-center w-full px-6 py-3 text-sm text-white transition rounded-xl`}>
                                <span>{lang.select}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </BlankLayout>
    )
}

export default SelectBranch