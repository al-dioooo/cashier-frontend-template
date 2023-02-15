import { useState } from 'react'
import { Modal } from 'components'
import { useEffect } from 'react'
import axios from 'axios'
import moment from 'moment/moment'
import SupplierIcon from 'components/icons/supplier'
import { PlusIcon, UsersIcon } from 'components/icons'
import useBranches from 'repositories/branch'
import useTypes from 'repositories/type'
import useCustomers from 'repositories/customer'
import useSuppliers from 'repositories/supplier'
import Label from 'components/forms/label'
import Input from 'components/forms/input'
import useInvoices from 'repositories/invoice'
import { useRef } from 'react'
import NoRedirectPagination from 'components/no-redirect-pagination'
import { useAuth } from 'contexts/auth-context'
import { lang } from "config"

const usePrevious = (value) => {
    const ref = useRef()

    useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}

const Content = ({ selected, onSelect }) => {
    const { currentBranch, isSuper } = useAuth()

    const [selectedInvoice, setSelectedInvoice] = useState(selected)

    const [page, setPage] = useState(1)

    const [search, setSearch] = useState('')
    const [branch, setBranch] = useState(isSuper() ? selectedInvoice[0]?.branch_id : currentBranch?.id)
    const [payorOrPayee, setPayorOrPayee] = useState(selectedInvoice[0]?.payor_or_payee_code)
    const [type, setType] = useState(selectedInvoice[0]?.type?.code)

    const { data: invoiceSelection, isLoading: isLoadingInvoices, mutate: mutateInvoices } = useInvoices({
        page,
        status: 'outstanding',
        paginate: 8,
        search,
        branch,
        payor_or_payee: payorOrPayee,
        type
    })

    const { data: branchSelection, mutate: mutateBranches } = useBranches({
        paginate: false
    })

    const { data: typeSelection, mutate: mutateTypes } = useTypes({
        model: 'Bill'
    })

    const { data: customerSelection, mutate: mutateCustomers } = useCustomers({
        paginate: false
    })

    const { data: supplierSelection, mutate: mutateSuppliers } = useSuppliers({
        paginate: false
    })

    const prevSelectedInvoice = usePrevious(selectedInvoice)

    useEffect(() => {
        setBranch(isSuper() ? selectedInvoice[0]?.branch_id : currentBranch?.id)
        setPayorOrPayee(selectedInvoice[0]?.payor_or_payee_code)
        setType(selectedInvoice[0]?.type?.code)

        mutateInvoices()

        if (prevSelectedInvoice !== selectedInvoice) {
            setPage(1)
        }
    }, [selectedInvoice, page])

    useEffect(() => {
        // setSelectedInvoice([])
        // setSearch(undefined)
        mutateInvoices()
    }, [branch, payorOrPayee, type])

    // useEffect(() => {
    //     setSelectedInvoice([])
    // }, [search])

    const handleChange = (value) => {
        if (selectedInvoice.find(row => row.invoice_number === value.invoice_number)) {
            setSelectedInvoice(selectedInvoice.filter(row => row.invoice_number !== value.invoice_number))
        } else {
            setSelectedInvoice([...selectedInvoice, value])
        }
    }

    const handleSelect = () => {
        onSelect(selectedInvoice)
    }

    const clearSelection = () => {
        setSelectedInvoice([])
    }

    const resetFilter = (e) => {
        e.preventDefault()

        setSearch(undefined)
        if (isSuper()) {
            setBranch(undefined)
        }
        setType(undefined)
        setPayorOrPayee(undefined)
    }

    return (
        <div className="mt-8">
            <div className="grid grid-cols-9 gap-4">
                <div className="col-span-2">
                    <Label htmlFor="search" value={lang.search} />
                    <Input disabled={Object.keys(selectedInvoice).length !== 0} onChange={e => setSearch(e.target.value)} value={search} id="search" />
                </div>

                {isSuper() && (
                    <div className="col-span-2">
                        <label for="branch" className="block text-xs text-neutral-700">{lang.branch}</label>
                        <select disabled={Object.keys(selectedInvoice).length !== 0} onChange={e => setBranch(e.target.value)} value={branch} name="branch" id="branch" className={`${Object.keys(selectedInvoice).length !== 0 ? 'bg-neutral-100 opacity-70' : ''} border-neutral-200 block w-full px-2 py-2 mt-1 text-sm transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`}>
                            <option value={undefined} selected={branch === undefined}></option>
                            {branchSelection?.map(row => (
                                <option value={row.id}>{row.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="col-span-2">
                    <label for="type" className="block text-xs text-neutral-700">{lang.type}</label>
                    <select disabled={Object.keys(selectedInvoice).length !== 0} onChange={e => setType(e.target.value)} value={type} name="type" id="type" className={`${Object.keys(selectedInvoice).length !== 0 ? 'bg-neutral-100 opacity-70' : ''} border-neutral-200 block w-full px-2 py-2 mt-1 text-sm transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`}>
                        <option value={undefined} selected={type === undefined}></option>
                        {typeSelection?.map(row => (
                            <option value={row.code}>{row.name}</option>
                        ))}
                    </select>
                </div>

                {type && (
                    (type === 'po' || type === 'rt-po') ? (
                        <div className="col-span-2">
                            <label for="supplier" className="block text-xs text-neutral-700">{lang.supplier}</label>
                            <select disabled={Object.keys(selectedInvoice).length !== 0} onChange={e => setPayorOrPayee(e.target.value)} value={payorOrPayee} name="supplier" id="supplier" className={`${Object.keys(selectedInvoice).length !== 0 ? 'bg-neutral-100 opacity-70' : ''} border-neutral-200 block w-full px-2 py-2 mt-1 text-sm transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`}>
                                <option value={undefined}></option>
                                {supplierSelection?.map(row => (
                                    <option value={row.supplier_code}>{row.name}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="col-span-2">
                            <label for="customer" className="block text-xs text-neutral-700">{lang.customer}</label>
                            <select disabled={Object.keys(selectedInvoice).length !== 0} onChange={e => setPayorOrPayee(e.target.value)} value={payorOrPayee} name="customer" id="customer" className={`${Object.keys(selectedInvoice).length !== 0 ? 'bg-neutral-100 opacity-70' : ''} border-neutral-200 block w-full px-2 py-2 mt-1 text-sm transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`}>
                                <option value={undefined}></option>
                                {customerSelection?.map(row => (
                                    <option value={row.customer_code}>{row.name}</option>
                                ))}
                            </select>
                        </div>
                    )
                )}

                {((branch && isSuper()) || type || payorOrPayee || search) && selectedInvoice.length === 0 && (
                    <div className="flex items-center text-xs text-neutral-700">
                        <button onClick={resetFilter} className="mt-5">{lang.reset}</button>
                    </div>
                )}
            </div>

            <div className="mt-4 overflow-x-auto border border-neutral-200 rounded-xl">
                <table className="min-w-full overflow-x-auto divide-y divide-neutral-200">
                    <thead className="bg-neutral-50 rounded-t-3xl">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.invoice}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.branch}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.customer_or_supplier}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.customer_or_supplier_code}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.type}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.transaction_type}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.grand_total}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.invoice_date}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.due_date}</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">{lang.action}</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                        {/* When loading */}
                        {isLoadingInvoices && (
                            <tr className="text-center">
                                <td colSpan="10" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {lang.loading_data}
                                </td>
                            </tr>
                        )}

                        {/* When there are no list available */}
                        {!isLoadingInvoices && !(branch || type || payorOrPayee) && invoiceSelection?.data.length === 0 && (
                            <tr className="text-center">
                                <td colSpan="10" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {lang.no_data}
                                </td>
                            </tr>
                        )}

                        {/* When there are no list available on searching */}
                        {!isLoadingInvoices && (branch || type || payorOrPayee) && invoiceSelection?.data.length === 0 && (
                            <tr className="text-center">
                                <td colSpan="10" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {lang.no_result}
                                </td>
                            </tr>
                        )}

                        {!isLoadingInvoices && invoiceSelection?.data.length !== 0 && invoiceSelection?.data.map(row => (
                            <tr onClick={() => handleChange(row)} className="transition cursor-pointer select-none hover:bg-neutral-50" key={row.invoice_number}>
                                <td className="px-6 py-4 text-xs font-medium text-neutral-900 whitespace-nowrap">
                                    {row.invoice_number}
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-neutral-900 whitespace-nowrap">
                                    {row.branch?.name}
                                </td>
                                <td class="px-6 py-4 text-xs font-medium text-neutral-900 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <span>
                                            {(row.type?.code === 'po' || row.type?.code === 'rt-po') ? (
                                                <SupplierIcon className="w-4 h-4" stroke={1.5} />
                                            ) : (
                                                <UsersIcon className="w-4 h-4" stroke={1.5} />
                                            )}
                                        </span>
                                        <span>
                                            {(row.type?.code === 'po' || row.type?.code === 'rt-po') ? row.supplier?.name : row.customer?.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-neutral-900 whitespace-nowrap">
                                    {row.payor_or_payee_code}
                                </td>
                                <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {row.type?.name}
                                </td>
                                <td class="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {row.transaction_type === 0 ? lang.income : lang.expense}
                                </td>
                                <td className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {row.currency && Intl.NumberFormat('id-Id', { style: 'currency', currency: row.currency }).format(row.grand_total)}
                                </td>
                                <td className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {moment(row.invoice_date).format('MMMM D, YYYY')}
                                </td>
                                <td className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {moment(row.due_date).format('MMMM D, YYYY')}
                                </td>
                                <td>
                                    <div className="flex items-center h-5">
                                        <input onChange={() => handleChange(row)} checked={selectedInvoice.length !== 0 && selectedInvoice.find(selected => selected.invoice_number === row.invoice_number)} id="pph" name="pph" type="checkbox" className="w-4 h-4 rounded-full border-neutral-300 text-neutral-800" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center mt-8 space-x-2 text-xs">
                <button type="button" onClick={handleSelect} className="items-center px-6 py-3 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                    <span>{lang.select}</span>
                </button>
                {selectedInvoice.length !== 0 && (
                    <button type="button" onClick={clearSelection} className="inline-flex items-center px-4 py-3 space-x-2 transition border border-neutral-200 bg-neutral-50 rounded-xl active:hover:scale-90">
                        <span>{lang.clear}</span>
                    </button>
                )}
                <NoRedirectPagination current={invoiceSelection?.current_page} links={invoiceSelection?.links} from={invoiceSelection?.from} to={invoiceSelection?.to} total={invoiceSelection?.total} update={(value) => setPage(value)} />
            </div>
        </div>
    )
}

const SelectCOA = ({ selected, onSelect, error, placeholder = "" }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleSelect = (value) => {
        onSelect(value)
        closeModal()
    }

    return (
        <>
            <button onClick={openModal} className={`${error ? 'border-red-200' : 'border-neutral-200'} inline-flex items-center px-4 py-3 space-x-2 text-xs transition border bg-neutral-50 rounded-xl active:hover:scale-90`}>
                <PlusIcon className="w-4 h-4" />
                <span>{placeholder}</span>
            </button>
            <Modal size="6xl" isOpen={isOpen} onClose={closeModal} title={`${lang.select} ${lang.invoice}`} content={<Content selected={selected} onSelect={handleSelect} />} />
        </>
    )
}

export default SelectCOA