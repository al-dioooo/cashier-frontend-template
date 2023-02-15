export const generatePhoneNumber = (code, phone) => {
    if (phone.toString().includes('+')) {
        phone.replace('+', '')
    }

    var codeLength = code.toString().length
    if (phone.toString().substring(0, codeLength) == code) {
        if (phone.toString().substring(0, codeLength + 1) == (code + '0')) {
            // jika ada 62089 harusnya 6289
            var deleteMissing = phone.replace((code + '0'), '')
            console.log(deleteMissing)
            return code + parseInt(deleteMissing).toString()
        } else {
            // jika no tlp sudah ada code phonenya, langsung return no tlp
            return phone
        }
    }

    // jika no tlp di awali dengan 0
    return code + parseInt(phone).toString()
}

export const removeCountryCodeFromPhoneNumber = (value, code) => {
    return value.replace(code, "")
}