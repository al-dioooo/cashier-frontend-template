import { Disclosure } from "@headlessui/react"
import { AdvancePaymentIcon, AlertTriangleIcon, BillIcon, BranchIcon, ChevronRightIcon, ComponentIcon, DashboardIcon, DatabaseIcon, LockAccessIcon, LoginIcon, NotebookIcon, PermissionRoleIcon, RoleUserBranchIcon, TaxPaymentIcon, UserIcon, UsersIcon, VerifyPaymentIcon } from "components/icons"
import FormsIcon from "components/icons/forms"
import SupplierIcon from "components/icons/supplier"
import { lang } from "config"
import { useAuth } from "contexts/auth-context"
import { AnimatePresence, motion } from "framer-motion"
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
                        <li>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex items-center justify-between w-full">
                                            <div className="flex items-center space-x-4">
                                                <div className={`${(open || url === '/form' || url === '/data' || url === '/other') ? 'bg-neutral-900 ring-1 ring-offset-2 ring-neutral-900' : 'bg-neutral-700'} p-2 text-white rounded-full`}>
                                                    <ComponentIcon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    {lang.component}
                                                </div>
                                            </div>
                                            <div className={`${open ? 'rotate-90' : ''} transition-transform p-[2px] border rounded-full border-neutral-300 bg-neutral-200/50`}>
                                                <ChevronRightIcon className="w-4 h-4" stroke={1} />
                                            </div>
                                        </Disclosure.Button>
                                        <AnimatePresence mode="wait">
                                            {open && (
                                                <motion.div initial={{ height: 0, marginTop: 0, opacity: 0 }} animate={{ height: 'auto', marginTop: '1rem', opacity: 1 }} exit={{ height: 0, marginTop: 0, opacity: 0 }} transition={{ ease: 'circOut' }} className="overflow-hidden">
                                                    <Disclosure.Panel static>
                                                        <ul className="space-y-4">
                                                            <li>
                                                                <Link to="/form" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center ml-3 text-xs group">
                                                                    <div className={`${url === '/form' ? 'bg-neutral-800 border-neutral-800' : 'bg-neutral-400/50 border-neutral-400'} transition w-4 h-4 border rounded-full group-hover:bg-neutral-800 group-hover:border-neutral-800`}></div>
                                                                    <span className={`${url === '/form' ? 'text-neutral-800' : 'text-neutral-500'} ml-7 group-hover:text-neutral-800 transition`}>{lang.title.form}</span>
                                                                    {url === '/form' && (<div className="flex-grow ml-4 border-t border-neutral-900"></div>)}
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/data" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center ml-3 text-xs group">
                                                                    <div className={`${url === '/data' ? 'bg-neutral-800 border-neutral-800' : 'bg-neutral-400/50 border-neutral-400'} transition w-4 h-4 border rounded-full group-hover:bg-neutral-800 group-hover:border-neutral-800`}></div>
                                                                    <span className={`${url === '/data' ? 'text-neutral-800' : 'text-neutral-500'} ml-7 group-hover:text-neutral-800 transition`}>{lang.data}</span>
                                                                    {url === '/data' && (<div className="flex-grow ml-4 border-t border-neutral-900"></div>)}
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/other" state={{ back: null, from: null, transition: 'fade' }} className="flex items-center ml-3 text-xs group">
                                                                    <div className={`${url === '/other' ? 'bg-neutral-800 border-neutral-800' : 'bg-neutral-400/50 border-neutral-400'} transition w-4 h-4 border rounded-full group-hover:bg-neutral-800 group-hover:border-neutral-800`}></div>
                                                                    <span className={`${url === '/other' ? 'text-neutral-800' : 'text-neutral-500'} ml-7 group-hover:text-neutral-800 transition`}>{lang.title.other}</span>
                                                                    {url === '/other' && (<div className="flex-grow ml-4 border-t border-neutral-900"></div>)}
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </Disclosure.Panel>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                )}
                            </Disclosure>
                        </li>
                    </ul>
                </div>
            </nav >
        </div >
    )
}

export default Sidebar