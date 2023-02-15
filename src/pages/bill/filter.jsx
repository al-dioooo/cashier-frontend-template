import { useEffect, useState } from 'react'
import { Modal } from 'components'
import axios from 'axios'
import moment from 'moment'
import Label from 'components/forms/label'
import Input from 'components/forms/input'
import InputAmount from 'components/forms/input-amount'
import InputDate from 'components/forms/input-date'
import useTypes from 'repositories/type'
import { lang } from "config"

const Content = ({ data, errors, onSubmit, onRemove }) => {
    const [billNumber, setBillNumber] = useState(data.billNumber)
    const [transactionType, setTransactionType] = useState(data.transactionType)
    const [type, setType] = useState(data.type)
    const [status, setStatus] = useState(data.status)
    const [grandTotal, setGrandTotal] = useState(data.grandTotal)
    const [from, setFrom] = useState(data.from)
    const [to, setTo] = useState(data.to)

    const { data: typeSelection, mutate: mutateTypes } = useTypes({
        model: 'Bill'
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            bill_number: billNumber,
            transaction_type: transactionType,
            type,
            status,
            grand_total: grandTotal,
            from,
            to
        }

        // Filter before passing data to parent
        onSubmit(Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null && v != '')))
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="bill_number" value={lang.bill_number} />
                    <Input onChange={e => setBillNumber(e.target.value)} value={billNumber} id="bill_number" />
                </div>

                <div></div>

                <div>
                    <Label htmlFor="type" value={lang.type} />
                    <select onChange={e => setType(e.target.value)} value={type} name="type" id="type" className={`border-neutral-200 block w-full px-2 py-2 mt-1 text-sm transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`}>
                        <option value={null} disabled selected>-- {lang.choose} {lang.type}  --</option>
                        {typeSelection?.map(row => (
                            <option value={row.code}>{row.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <Label htmlFor="transaction_type" value={lang.transaction_type} />
                    <select onChange={(e) => setTransactionType(e.target.value)} value={transactionType} name="transaction_type" id="transaction_type" className="block w-full px-2 py-2 mt-1 text-sm transition border border-neutral-200 focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200">
                        <option value={null} disabled selected>-- {lang.choose} {lang.transaction_type} --</option>
                        <option value="income">{lang.income}</option>
                        <option value="expense">{lang.expense}</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="status" value={lang.status} />
                    <select onChange={(e) => setStatus(e.target.value)} value={status} name="status" id="status" className="block w-full px-2 py-2 mt-1 text-sm transition border border-neutral-200 focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200">
                        <option value={null} disabled selected>-- {lang.choose} {lang.status} --</option>
                        <option value="outstanding">Outstanding</option>
                        <option value="paid">Paid</option>
                        <option value="settled">Settled</option>
                        <option value="drop">Drop</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="grand_total" value={lang.grand_total} />
                    <InputAmount onChange={value => setGrandTotal(value)} value={parseFloat(grandTotal)} id="grand_total" />
                </div>

                <div>
                    <Label htmlFor="from" value={lang.from} />
                    <InputDate id="from" maxDate={Date.parse(to)} onChange={(value) => setFrom(moment(value).format('Y-M-DD'))} value={Date.parse(from)} selected={Date.parse(from)} />
                </div>

                <div>
                    <Label htmlFor="to" value={lang.to} />
                    <InputDate id="to" minDate={Date.parse(from)} onChange={(value) => setTo(moment(value).format('Y-M-DD'))} value={Date.parse(to)} selected={Date.parse(to)} />
                </div>
            </div>
            <div className="flex items-center space-x-2 text-xs">
                <button type="submit" className="items-center px-6 py-3 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                    <span>{lang.filter}</span>
                </button>
                <button type="button" onClick={onRemove} className="items-center px-6 py-3 transition border border-neutral-200 bg-neutral-50 rounded-xl active:hover:scale-90">
                    <span>{lang.clear}</span>
                </button>
            </div>
        </form>
    )
}

const Filter = ({ data, errors, onSubmit, onRemove }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleSubmit = (value) => {
        closeModal()
        onSubmit(value)
    }

    const handleRemove = () => {
        closeModal()
        onRemove()
    }

    return (
        <>
            <button onClick={openModal} className="inline-flex items-center px-4 py-3 space-x-2 transition border border-neutral-200 bg-neutral-50 rounded-xl active:hover:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5"></path>
                </svg>
                <span>{lang.filter}</span>
                {Object.keys(data).length > 0 && (
                    <span className="inline-flex w-4 h-4 font-semibold rounded-full text-[0.5rem] justify-center text-neutral-200 bg-neutral-800">
                        {`${Object.keys(data).length}`}
                    </span>
                )}
            </button>
            <Modal isOpen={isOpen} onClose={closeModal} title={`${lang.filter} ${lang.bill}`} content={<Content errors={errors} onSubmit={handleSubmit} onRemove={handleRemove} data={data} />} />
        </>
    )
}

export default Filter