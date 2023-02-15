import axios from "axios"
import { getToken, getUser, removeSession, setSession } from "helpers/auth-helper"
import toast from "react-hot-toast"

export const load = async () => {
    const user = await getUser()
    const token = await getToken()

    if (user === null && token !== null) {
        await axios.post(`${process.env.REACT_APP_GLOBAL_API_URL}/token/verify`, {
            token: token
        }).then((response) => {
            setSession(response.data.data.token, response.data.data.user)
            toast.success(response.data.message)
            console.log(response.data.message)
        }).catch((error) => {
            removeSession()
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        })
    }
}