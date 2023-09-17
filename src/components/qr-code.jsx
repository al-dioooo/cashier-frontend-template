import { QRCodeSVG } from "qrcode.react"
import { useEffect, useState } from "react"

// Library Demo
// https://zpao.github.io/qrcode.react/

const QRCode = ({ value, bgColor = "#FFFFFF00", fgColor = "#000", size = 32, level, imageSettings }) => {
    const [valueState, setValueState] = useState(value)

    // Update value on props change
    useEffect(() => {
        setValueState(value)
    }, [value])

    return (
        <QRCodeSVG bgColor={bgColor} fgColor={fgColor} value={valueState} size={size} level={level} imageSettings={imageSettings} />
    )
}

export default QRCode