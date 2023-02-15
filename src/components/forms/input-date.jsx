import ReactDatePicker from "react-datepicker"

const InputDate = ({ onChange, disabled, error, id, value, selected, minDate, maxDate, minTime, maxTime, dateFormat, showTimeSelect }) => {
    return (
        <ReactDatePicker autoComplete="off" showTimeSelect={showTimeSelect} timeFormat="HH:mm" dateFormat={`${dateFormat ?? "dd/MM/yyyy"}`} onChange={onChange} disabled={disabled} minDate={minDate} maxDate={maxDate} minTime={minTime} maxTime={maxTime} selected={selected} value={value} id={id} className={`${error ? 'border-red-200' : 'border-neutral-200'} ${disabled ? 'bg-neutral-100 opacity-70' : ''} block w-full px-2 py-2 mt-1 text-sm transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`} />
    )
}

export default InputDate