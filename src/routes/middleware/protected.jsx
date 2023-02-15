import { getCurrentBranch, getUser } from "helpers/auth-helper"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children, needToSelectBranch = true, needToHaveRole = true }) => {
    const user = getUser()
    const currentBranch = getCurrentBranch()
    const location = useLocation()

    // if (!user) {
    //     return <Navigate to="/login" state={{ back: location.pathname }} replace={true} />
    // } else if (location.pathname !== '/no-role' && !currentBranch && user?.roles.length === 0 && needToHaveRole) {
    //     return <Navigate to="/no-role" replace={true} />
    // } else if (location.pathname !== '/branch/select' && !currentBranch && user?.roles.length !== 0 && !user.roles.find((role) => role.is_super === 1) && needToSelectBranch) {
    //     return <Navigate to="/branch/select" replace={true} />
    // } else if (location.pathname === '/branch/select' && currentBranch && user?.roles.length !== 0) {
    //     return <Navigate to="/" replace={true} />
    // }

    return children
}

export default ProtectedRoute