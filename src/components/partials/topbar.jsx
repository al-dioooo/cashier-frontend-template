import { lang } from "config"
import { useAuth } from "contexts/auth-context"
import { useLocation } from "react-router-dom"
import BranchDropdown from "./branch-dropdown"
import UserDropdown from "./user-dropdown"

const Topbar = (props) => {
    const { user } = useAuth()

    return (
        <div className="flex items-center justify-between w-full px-8 py-4 border-b-[1.5px] border-neutral-200">
            <div className="text-sm">{`Hello ${user ? user?.name : "there"}!`}</div>
            <div className="flex items-center space-x-4">
                <BranchDropdown />
                <UserDropdown />
            </div>
        </div>
    )
}

export default Topbar