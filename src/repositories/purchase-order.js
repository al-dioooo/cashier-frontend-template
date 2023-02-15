import axios from "axios"
import useSWR from "swr"

const fetcher = async (url, params) => {
    console.log(`Fetching ${url}`)

    return await axios.get(url, { params }).then(res => res.data.data)
}

const usePurchaseOrders = (params, url) => {
    const { data, error, mutate } = useSWR([`${url}`, params], fetcher)

    return {
        data,
        isLoading: !error && !data,
        error,
        mutate
    }
}

export default usePurchaseOrders