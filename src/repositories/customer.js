import axios from "axios"
import useSWR from "swr"

const fetcher = async (url, params) => {
    console.log(`Fetching ${url}`)

    return await axios.get(url, { params }).then(res => res.data)
}

const useCustomers = (params) => {
    const { data, error, mutate } = useSWR([`${process.env.REACT_APP_BACKEND_URL}/customer`, params], fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        error,
        mutate
    }
}

export default useCustomers