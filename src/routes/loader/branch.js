import axios from "axios"
import { getUser } from "helpers/auth-helper"
import nProgress from "nprogress"
import { json } from "react-router-dom"

export const getByUser = async ({ params }) => {
    const user = getUser()

    return axios.get(`${process.env.REACT_APP_GLOBAL_API_URL}/branch/by`, {
        params: {
            user_id: user.id
        }
    }).then(res => res.data.data.branches).catch((error) => {
        throw new json(error, error.response.status)
    })
}