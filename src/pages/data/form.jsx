import { useState, useEffect } from "react"

import moment from "moment"
import useBranches from "repositories/branch"
import nProgress from "nprogress"
import ErrorMessage from "components/forms/error-message"
import _ from "lodash"
import InputAmount from "components/forms/input-amount"
import { NumericFormat } from "react-number-format"
import InputDate from "components/forms/input-date"
import { useAuth } from "contexts/auth-context"
import { lang } from "config"
import useCurrencies from "repositories/currency"
import useChartOfAccounts from "repositories/source"
import SelectCOA from "components/forms/select-coa"
import useAccounts from "repositories/account"
import useUsers from "repositories/user"
import useRoles from "repositories/role"
import SelectDescription from "components/forms/select-description"
import Label from "components/forms/label"
import Input from "components/forms/input"

const Form = ({ data, errors, onSubmit }) => {
    const [user, setUser] = useState(data?.user ?? null)
    const [email, setEmail] = useState(data?.email ?? null)
    const [phone, setPhone] = useState(data?.phone ?? null)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({
            user,
            email,
            phone
        })
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="user" value={lang.user} />
                    <Input error={errors.user} onChange={e => setUser(e.target.value)} value={user} id="user" />
                    <ErrorMessage error={errors.user} />
                </div>
                
                <div>
                    <Label htmlFor="email" value={lang.email} />
                    <Input error={errors.email} onChange={e => setEmail(e.target.value)} value={email} id="email" />
                    <ErrorMessage error={errors.email} />
                </div>

                <div>
                    <Label htmlFor="phone" value={lang.phone} />
                    <Input error={errors.phone} onChange={e => setPhone(e.target.value)} value={phone} id="phone" />
                    <ErrorMessage error={errors.phone} />
                </div>
            </div>
            <div className="text-xs">
                <button type="submit" className="items-center px-6 py-3 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                    <span>{`${_.isEmpty(data) ? lang.create : lang.update}`}</span>
                </button>
            </div>
        </form>
    )
}

export default Form