import axios from "axios"
import useSWR from "swr"

const fetcher = async (url, params) => {
    console.log(`Fetching ${url}`)

    return await axios.get(url, { params }).then(res => res.data)
}

const useCurrencies = (params) => {
    const { data, error, mutate } = useSWR([`${process.env.REACT_APP_ACCOUNTING_API_URL}/api/get-currency`, params], fetcher)

    return {
        data,
        isLoading: !error && !data,
        error,
        mutate
    }
}

export default useCurrencies