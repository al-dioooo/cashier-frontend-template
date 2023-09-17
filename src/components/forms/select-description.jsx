import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from 'components/icons'
import { useEffect } from 'react'
import { lang } from 'config'

const SelectDescription = ({ selection = [], isLoading, value, placeholder, keyValue, title, description, onChange, error }) => {
    const [selected, setSelected] = useState(value ? (selection.find(row => row[keyValue] === parseInt(value)) ?? {}) : {})

    useEffect(() => {
        onChange(selected[keyValue])
    }, [selected, value])

    useEffect(() => {
        if (value && selection.length !== 0 && !isLoading) {
            setSelected(selection.find((row) => row[keyValue] === parseInt(value)))
        }
    }, [isLoading])

    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
                <Listbox.Button className={`${error ? 'border-red-200' : 'border-neutral-200'} w-full px-4 py-2 text-sm text-left transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`}>
                    <span className={`block truncate`}>
                        {isLoading ? lang.loading_data : selected[title] ?? placeholder}
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
                    <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white border rounded-xl max-h-60 border-neutral-200 focus:outline-none sm:text-sm">
                        {selection?.map((row, index) => (
                            <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-900'
                                    }`
                                }
                                value={row}
                            >
                                {({ selected }) => (
                                    <>
                                        <div>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {row[title]}
                                            </span>
                                            <span className={`block truncate text-xs ${selected ? 'font-normal' : 'font-light'}`}>
                                                {row[description]}
                                            </span>
                                        </div>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-600">
                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox >
    )
}

export default SelectDescription