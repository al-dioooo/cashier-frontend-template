import axios from "axios"
import useSWR from "swr"

const fetcher = async (url, params) => {
    console.log(`Fetching ${url}`)

    return await axios.get(url, { params }).then(res => res.data.data.branches)
}

const useBranchesByUser = (params) => {
    const { data, error, mutate } = useSWR([`${process.env.REACT_APP_GLOBAL_API_URL}/branch/by`, params], fetcher)

    return {
        data,
        isLoading: !error && !data,
        error,
        mutate
    }
}

export default useBranchesByUser