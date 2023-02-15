import axios from "axios"
import nProgress from "nprogress"
import { json } from "react-router-dom"

export const list = async ({ request }) => {
    const searchParams = new URL(request.url).searchParams

    const search = searchParams.get('search')
    const name = searchParams.get('name')
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    nProgress.start()

    return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/supplier`, {
        params: {
            search,
            name,
            from,
            to
        }
    }).then((res) => {
        return res.data
    }).then(() => {
        nProgress.done()
    }).catch((error) => {
        throw new json(error, error.response.status)
    })
}

export const show = async ({ params }) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/supplier/${params.id}`).then(res => res.data).catch((error) => {
        throw new json(error, error.response.status)
    })
}