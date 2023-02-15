import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from 'components/icons'
import { useEffect } from 'react'

const SelectCountry = ({ selection, value, onChange, error }) => {
    const [selected, setSelected] = useState(value ?? {})

    useEffect(() => {
        onChange(selected)
    }, [selected])

    useEffect(() => {
        setSelected(value)
    }, [value])

    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
                <Listbox.Button className={`${error ? 'border-red-200' : 'border-neutral-200'} w-full px-4 py-2 text-sm text-left transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`}>
                    <span className={`${Object.keys(selected).length === 0 && selected.constructor === Object && "text-neutral-400"} flex items-center space-x-2 truncate`}>
                        <span>
                            <img className="object-cover w-6 h-auto rounded" src={`${process.env.REACT_APP_GLOBAL_API_URL}/${selected.icon}`} alt="" />
                        </span>
                        <span className="text-xs">
                            {`(+${selected.phonecode})`}
                        </span>
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronUpDownIcon
                            className="w-5 h-5 text-neutral-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white border rounded-xl max-h-60 border-neutral-200 focus:outline-none sm:text-sm">
                        {selection?.map((row, index) => (
                            <Listbox.Option
                                key={row.id}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 px-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-neutral-900'
                                    }`
                                }
                                value={row}
                            >
                                {({ selected }) => (
                                    <>
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <span>
                                                    <img className="object-cover w-6 h-auto rounded" src={`${process.env.REACT_APP_GLOBAL_API_URL}/${row.icon}`} alt="" />
                                                </span>
                                            </div>
                                            <div>
                                                <span className={`block text-xs truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    {row.nicename}
                                                </span>
                                                <span className={`block text-[0.5rem] text-neutral-600`}>
                                                    {`(+${row.phonecode})`}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}

export default SelectCountry