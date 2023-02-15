import { useState } from 'react'
import { Modal } from 'components'
import moment from 'moment/moment'
import SupplierIcon from 'components/icons/supplier'
import { UsersIcon } from 'components/icons'
import { lang } from "config"

const Content = ({ data, closeModal }) => {
    return (
        <div className="mt-8 space-y-8">
            <div className="overflow-x-auto border border-neutral-200 rounded-xl">
                <table className="min-w-full overflow-x-auto divide-y divide-neutral-200">
                    <thead className="bg-neutral-50 rounded-t-3xl">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.approval_level}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.approval_status}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.note}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.approved_by}</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-left uppercase text-neutral-500 whitespace-nowrap">{lang.approved_at}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                        {data.length === 0 && (
                            <tr className="text-center">
                                <td colSpan="5" className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {lang.no_data}
                                </td>
                            </tr>
                        )}
                        {data.length !== 0 && data.map(row => (
                            <tr key={row.id}>
                                <td className="px-6 py-4 text-xs font-medium text-neutral-900 whitespace-nowrap">
                                    {row.approval_level}
                                </td>
                                <td className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    <span className={`${row.status === 'outstanding' ? 'text-neutral-800 bg-neutral-100' : row.status === 'waiting' ? 'text-yellow-800 bg-yellow-100' : row.status === 'approved' ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'} capitalize inline-flex px-2 text-xs font-semibold leading-5 rounded-full`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {row.note}
                                </td>
                                <td className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {row.approved_by}
                                </td>
                                <td className="px-6 py-4 text-xs text-neutral-500 whitespace-nowrap">
                                    {`${moment(row.approved_at).format('MMMM D, YYYY')} ${lang.at} ${moment(row.approved_at).format('HH.mm')}`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-xs">
                <button onClick={closeModal} className="items-center px-6 py-3 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                    <span>{lang.close}</span>
                </button>
            </div>
        </div>
    )
}

const ApprovalHistory = ({ data, largeButton = false }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <>
            {largeButton ? (
                <button type="button" onClick={openModal} className="block w-full px-2 py-2 mt-1 text-sm transition border border-neutral-200 focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200">
                    {lang.see_histories} {data?.length !== 0 && `(${data.length})`}
                </button>
            ) : (
                <button onClick={openModal} className="inline-flex items-center space-x-2 text-xs underline">
                    <div>
                        {lang.see_histories}
                    </div>
                </button>
            )}
            <Modal isOpen={isOpen} size="6xl" onClose={closeModal} title={lang.approval_histories} content={<Content data={data} closeModal={closeModal} />} />
        </>
    )
}

export default ApprovalHistory