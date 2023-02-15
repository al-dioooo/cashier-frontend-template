import axios from "axios"
import useSWR from "swr"

const fetcher = async (url, params) => {
    console.log(`Fetching ${url}`)

    return await axios.get(url, { params }).then(res => res.data.data.map)
}

const useRoleUserBranchMaps = (params) => {
    const { data, error, mutate, isValidating } = useSWR([`${process.env.REACT_APP_GLOBAL_API_URL}/user/map`, params], fetcher)

    return {
        data,
        isLoading: !error && !data,
        error,
        isValidating,
        mutate
    }
}

export default useRoleUserBranchMaps