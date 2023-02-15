import axios from "axios"
import { json } from "react-router-dom"

export const show = async ({ params }) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/invoice/${params.number}`).then(res => res.data).catch((error) => {
        throw new json(error, error.response.status)
    })
}