import { ChevronUpDownIcon, XIcon } from "components/icons"
import Select, { components } from "react-select"

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <ChevronUpDownIcon className="w-5 h-5 text-neutral-400" />
        </components.DropdownIndicator>
    )
}

const MultiValueRemove = (props) => {
    return (
        <components.MultiValueRemove {...props}>
            <XIcon className="w-3 h-3" stroke={1.5} />
        </components.MultiValueRemove>
    )
}

const ClearIndicator = (props) => {
    const {
        children = <XIcon className="w-5 h-5 text-neutral-400" />,
        getStyles,
        innerProps: { ref, ...restInnerProps },
    } = props

    return (
        <div
            {...restInnerProps}
            ref={ref}
            style={getStyles('clearIndicator', props)}
        >
            <div style={{ padding: '0px 5px' }}>{children}</div>
        </div>
    )
}

{/* <div className="px-4 py-2"></div> */ }

const SelectMultiple = ({ optionLabel, optionValue, options, onChange, error, value }) => {
    return (
        <Select
            defaultValue={value}
            components={{
                DropdownIndicator,
                MultiValueRemove,
                ClearIndicator
            }}
            styles={{
                multiValue: (base) => ({
                    ...base,
                    borderRadius: '10rem',
                    padding: '0 0.25rem'
                }),
                multiValueRemove: (provided) => ({
                    ...provided,
                    borderRadius: '10rem',
                    margin: 'auto',
                    padding: '.25rem',
                    display: 'flex',
                    justifyContent: 'center'
                }),
                clearIndicator: () => ({
                    cursor: 'pointer'
                }),
                control: (provided, state) => ({
                    borderColor: state.isFocused ? '#A3A3A3' : error ? '#FECACA' : '#E5E5E5'
                })
            }} classNamePrefix="select" onChange={onChange} isMulti getOptionLabel={optionLabel} getOptionValue={optionValue} options={options} className="mt-1 text-sm" />
    )
}

export default SelectMultiple