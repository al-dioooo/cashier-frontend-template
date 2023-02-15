import { XIcon } from 'components/icons'
import React from 'react'

import { components } from 'react-select'
import CreatableSelect from 'react-select/creatable'

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

const MultiValueRemove = (props) => {
    return (
        <components.MultiValueRemove {...props}>
            <XIcon className="w-3 h-3" stroke={1.5} />
        </components.MultiValueRemove>
    )
}

const CreatableInput = ({ error, onChange, onInputChange, onKeyDown, inputValue, value }) => {
    return (
        <CreatableSelect
            components={{
                DropdownIndicator: null,
                MultiValueRemove,
                ClearIndicator
            }}
            inputValue={inputValue}
            isClearable
            isMulti
            placeholder={''}
            menuIsOpen={false}
            onChange={onChange}
            onInputChange={onInputChange}
            onKeyDown={onKeyDown}
            value={value}
            styles={{
                multiValue: (base) => ({
                    ...base,
                    borderRadius: '10rem',
                    padding: '0 0.5rem'
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
            }}
            classNamePrefix="select"
            className="mt-1 text-sm"
        />
    )
}

export default CreatableInput