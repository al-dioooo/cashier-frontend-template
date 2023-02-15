import { NumericFormat } from "react-number-format"

const InputAmount = ({ onChange, placeholder, disabled, error, id, value, decimalScale, decimalSeparator, thousandSeparator, min }) => {
    return <NumericFormat placeholder={placeholder} min={min} disabled={disabled} className={`${error ? 'border-red-200' : 'border-neutral-200'} ${disabled ? 'bg-neutral-100 opacity-70' : ''} block w-full px-2 py-2 mt-1 text-sm transition border focus:outline-none rounded-xl focus:border-neutral-400 focus:ring focus:ring-neutral-200`} onValueChange={({ floatValue }) => { onChange(floatValue) }} value={value} id={id} decimalScale={decimalScale ?? 2} decimalSeparator={decimalSeparator ?? ','} thousandSeparator={thousandSeparator ?? '.'} />
}

export default InputAmount