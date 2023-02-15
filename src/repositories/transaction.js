import axios from "axios"
import useSWR from "swr"

const fetcher = async (url, params) => {
    console.log(`Fetching ${url}`)

    return await axios.get(url, { params }).then(res => res.data)
}

const useTransactions = (params) => {
    const { data, error, mutate } = useSWR([`${process.env.REACT_APP_BACKEND_URL}/transaction`, params], fetcher)

    const links = [
        {
            url: data?.prev_page_url ?? null,
            active: data?.prev_page_url === null ? false : true,
            label: '&laquo; Previous'
        },
        {
            url: data?.next_page_url ?? null,
            active: data?.next_page_url === null ? false : true,
            label: 'Next &raquo;'
        }
    ]

    return {
        data: data,
        isLoading: !error && !data,
        error,
        mutate,
        links
    }
}

export default useTransactions