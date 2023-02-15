import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'

const Radio = ({ selection, value, keyValue, title, description, onChange, error, disabled }) => {
    const [selected, setSelected] = useState(value)

    useEffect(() => {
        onChange(selected)
    }, [selected])

    return (
        <div className="w-full mt-1">
            <div className="w-full">
                <RadioGroup disabled={disabled} value={selected} onChange={setSelected}>
                    <div className="space-y-2">
                        {selection?.map((row) => (
                            <RadioGroup.Option
                                key={row[keyValue]}
                                value={row[keyValue]}
                                className={({ active, checked }) =>
                                    `${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-neutral-300' : ''}
                                    ${checked ? (disabled ? 'bg-neutral-600 text-white' : 'bg-neutral-800 text-white') : 'bg-white'}
                                    ${disabled ? '' : 'cursor-pointer'}
                                    ${error ? 'border-red-200' : 'border-neutral-200'}
                                    relative flex rounded-xl px-5 py-4 border focus:outline-none`
                                }>
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium  ${checked ? 'text-white' : 'text-neutral-900'
                                                            }`}
                                                    >
                                                        {row[title]}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description
                                                        as="span"
                                                        className={`inline ${checked ? 'text-neutral-100' : 'text-neutral-500'
                                                            }`}
                                                    >
                                                        <span>
                                                            {Array.isArray(row[description]) ? (
                                                                <>
                                                                    {row[description].map((desc, index) => (
                                                                        <>
                                                                            {`${desc.number}${row[description].length === index + 1 ? '' : ', '}`}
                                                                        </>
                                                                    ))}
                                                                </>
                                                            ) : (
                                                                <>{row[description]}</>
                                                            )}
                                                        </span>
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

export default Radio