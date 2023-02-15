import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'

const BranchRadio = ({ selection, value, onChange, error }) => {
    const [selected, setSelected] = useState(value)

    useEffect(() => {
        onChange(selected)
    }, [selected])

    return (
        <div className="w-full">
            <div className="w-full max-w-md mx-auto">
                <RadioGroup value={selected} onChange={setSelected}>
                    <div className="space-y-2">
                        {selection.map((branch) => (
                            <RadioGroup.Option
                                key={branch.id}
                                value={branch}
                                className={({ active, checked }) =>
                                    `${active ? 'ring-2 ring-neutral-800 ring-opacity-60 ring-offset-2 ring-offset-neutral-100' : ''}
                                    ${checked ? 'bg-neutral-800 text-white' : 'bg-white'}
                                    relative flex cursor-pointer rounded-xl px-5 py-4 border focus:outline-none`
                                }>
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label as="p" className={`font-medium mx-1 ${checked ? 'text-white' : 'text-neutral-900' }`}>
                                                        {branch.name}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description as="span" className={`flex mt-2 flex-wrap space-x-1 ${checked ? 'text-neutral-100' : 'text-neutral-500'}`}>
                                                        {branch.roles.map((role, index) => (
                                                            // <span>{`${role.name}${(branch.roles.length - 1) === index ? '' : ','}`}</span>
                                                            <span className={`px-2 py-1 m-1 text-xs rounded-full ${checked ? 'text-neutral-100 bg-neutral-700' : 'text-neutral-500 bg-neutral-100'}`}>{`${role.name}`}</span>
                                                        ))}
                                                    </RadioGroup.Description>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="text-white shrink-0">
                                                    <CheckIcon className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default BranchRadio