import axios from "axios"
import { getCurrentBranch } from "helpers/auth-helper"
import { json } from "react-router-dom"

const branch = getCurrentBranch()

export const show = async ({ params }) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/dashboard`, {
        params: {
            branch: branch?.id
        }
    }).then(res => res.data).catch((error) => {
        throw new json(error, error.response.status)
    })
}