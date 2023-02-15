import axios from "axios"
import { getUser } from "helpers/auth-helper"
import { json, redirect } from "react-router-dom"

export const load = async ({ params }) => {
    const user = await getUser()

    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/approval/${params.number}/${user?.phone}`).then(res => res.data).catch((error) => {
        if (!user) {
            redirect("/login")
        } else {
            throw new json(error, error.response.status)
        }
    })
}

export const loadAutoRedirect = async ({ params }) => {
    const user = await getUser()

    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/approval/${params.number}/${user?.phone}`).then(res => {
        if (res.data.is_settled) {
            return redirect('already')
        } else {
            return res.data
        }
    }).catch((error) => {
        if (!user) {
            redirect("/login")
        } else {
            throw new json(error, error.response.status)
        }
    })
}