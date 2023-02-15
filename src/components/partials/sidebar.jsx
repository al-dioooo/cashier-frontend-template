import { AdvancePaymentIcon, AlertTriangleIcon, BillIcon, BranchIcon, ComponentIcon, DashboardIcon, DatabaseIcon, LockAccessIcon, LoginIcon, NotebookIcon, PermissionRoleIcon, RoleUserBranchIcon, TaxPaymentIcon, UserIcon, UsersIcon, VerifyPaymentIcon } from "components/icons"
import FormsIcon from "components/icons/forms"
import SupplierIcon from "components/icons/supplier"
import { lang } from "config"
import { useAuth } from "contexts/auth-context"
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
    const url = useLocation().pathname
    const { can } = useAuth()

    return (
        <div className="flex flex-col max-h-screen pt-12 space-y-16 font-sans">
            <div className="ml-12 text-3xl">
                {/* Set app name on .env file */}
                {process.env.REACT_APP_NAME}
            </div>
            <nav className="w-56 max-h-full px-4 pb-8 ml-8 space-y-8 overflow-x-visible overflow-y-auto">
                <div className="space-y-2">
                    <div className="text-xs">
                        {lang.pages}
                    </div>
                    <ul className="space-y-6">
                        <li>
                            <Link to="/" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center space-x-4">
                                <div className={`${url === '/' ? 'bg-neutral-900 ring-[1.5px] ring-offset-2 ring-neutral-900' : 'bg-neutral-700'} p-2 text-white rounded-full`}>
                                    <DashboardIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    {lang.title.dashboard}
                                </div>
                                {url === '/' && (<div className="flex-grow border-t border-neutral-900"></div>)}
                            </Link>
                        </li>
                        <li>
                            <Link to="/bill" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center space-x-4">
                                <div className={`${url === '/bill' ? 'bg-neutral-900 ring-[1.5px] ring-offset-2 ring-neutral-900' : 'bg-neutral-700'} p-2 text-white rounded-full`}>
                                    <BillIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    {lang.title.bill}
                                </div>
                                {url === '/bill' && (<div className="flex-grow border-t border-neutral-900"></div>)}
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center space-x-4">
                                <div className={`${url === '/login' ? 'bg-neutral-900 ring-[1.5px] ring-offset-2 ring-neutral-900' : 'bg-neutral-700'} p-2 text-white rounded-full`}>
                                    <LoginIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    Login
                                </div>
                                {url === '/login' && (<div className="flex-grow border-t border-neutral-900"></div>)}
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center space-x-4">
                                <div className={`${url === '/register' ? 'bg-neutral-900 ring-[1.5px] ring-offset-2 ring-neutral-900' : 'bg-neutral-700'} p-2 text-white rounded-full`}>
                                    <NotebookIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    Register
                                </div>
                                {url === '/register' && (<div className="flex-grow border-t border-neutral-900"></div>)}
                            </Link>
                        </li>
                        <li>
                            <Link to="/no-role" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center space-x-4">
                                <div className={`${url === '/no-role' ? 'bg-neutral-900 ring-[1.5px] ring-offset-2 ring-neutral-900' : 'bg-neutral-700'} p-2 text-white rounded-full`}>
                                    <AlertTriangleIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    No Role
                                </div>
                                {url === '/no-role' && (<div className="flex-grow border-t border-neutral-900"></div>)}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <div className="text-xs">
                        {lang.component}
                    </div>
                    <ul className="space-y-6">
                        <li>
                            <Link to="/form" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center space-x-4">
                                <div className={`${url === '/form' ? 'bg-neutral-900 ring-1 ring-offset-2 ring-neutral-900' : 'bg-neutral-700'} p-2 text-white rounded-full`}>
                                    <FormsIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    {lang.title.form}
                                </div>
                                {url === '/form' && (<div className="flex-grow border-t border-neutral-900"></div>)}
                            </Link>
                        </li>
                        <li>
                            <Link to="/data" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center space-x-4">
                                <div className={`${url === '/data' ? 'bg-neutral-900 ring-1 ring-offset-2 ring-neutral-900' : 'bg-neutral-700'} p-2 text-white rounded-full`}>
                                    <DatabaseIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    {lang.data}
                                </div>
                                {url === '/data' && (<div className="flex-grow border-t border-neutral-900"></div>)}
                            </Link>
                        </li>
                        <li>
                            <Link to="/other" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center space-x-4">
                                <div className={`${url === '/other' ? 'bg-neutral-900 ring-1 ring-offset-2 ring-neutral-900' : 'bg-neutral-700'} p-2 text-white rounded-full`}>
                                    <ComponentIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    {lang.title.other}
                                </div>
                                {url === '/other' && (<div className="flex-grow border-t border-neutral-900"></div>)}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar