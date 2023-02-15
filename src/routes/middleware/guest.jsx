import { getUser } from "helpers/auth-helper"
import { Navigate } from "react-router-dom"

const GuestRoute = ({ children }) => {
    const user = getUser()

    // if (user) {
    //     return <Navigate to="/" replace />
    // }

    return children;
}

export default GuestRoute