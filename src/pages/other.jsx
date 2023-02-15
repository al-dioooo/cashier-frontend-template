import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import AppLayout from "layouts/app-layout"
import Transition from "components/transition"
import { BranchIcon, CalendarIcon, DollarIcon, FileInfoIcon, FilterIcon, PlusIcon, TrendingUpIcon } from "components/icons"
import { Divider } from "components"
import ModalExample from "pages/other/modal"
import moment from "moment"

const Other = ({ title }) => {
    const location = useLocation()

    return (
        <AppLayout title={title}>
            <div className="p-8 space-y-16">
                <div>
                    <button disabled className="pointer-events-none">
                        <Link to={location.pathname} className="cursor-default">
                            <motion.h1 layout transition={{ duration: .5, type: "tween" }} layoutId={title} className="text-3xl font-medium">
                                {title}
                            </motion.h1>
                        </Link>
                    </button>
                </div>
                <Transition type="fade">
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <span className="text-xs text-neutral-500">Buttons</span>
                            <div className="flex items-center p-4 space-x-4 text-xs border rounded-xl">
                                <button className="inline-flex items-center px-4 py-3 space-x-2 text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                                    <PlusIcon className="w-4 h-4" stroke={1.5} />
                                    <span>Create</span>
                                </button>
                                <button className="inline-flex px-4 py-3 space-x-2 text-center text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                                    <span>Button</span>
                                </button>
                                <button disabled={true} className={`${true ? "opacity-70" : ""} inline-flex px-4 py-3 space-x-2 text-center text-white transition bg-neutral-800 rounded-xl active:hover:scale-90`}>
                                    <span>Disabled</span>
                                </button>
                                <button className="inline-flex items-center px-4 py-3 space-x-2 transition border border-neutral-200 bg-neutral-50 rounded-xl active:hover:scale-90">
                                    <FilterIcon className="w-4 h-4" stroke={1.5} />
                                    <span>Filter</span>
                                </button>
                                <button className="inline-flex items-center px-4 py-3 space-x-2 transition border border-neutral-200 bg-neutral-50 rounded-xl active:hover:scale-90">
                                    <FilterIcon className="w-4 h-4" stroke={1.5} />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs text-neutral-500">Modal</span>
                            <div className="flex items-center p-4 space-x-4 text-xs border rounded-xl">
                                <ModalExample />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs text-neutral-500">Heading</span>
                            <div className="flex flex-col p-4 space-y-8 text-xs border rounded-xl">
                                {/* Data with Icon */}
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 rounded-xl bg-neutral-100">
                                        <BranchIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Veilside</div>
                                        <div className="flex items-center space-x-2 text-xs">
                                            <div>info@veilside.co.jp</div>
                                            <div className="font-light text-neutral-200">|</div>
                                            <div>1250-3, Mase, Tsukuba-shi, Ibaraki, 300-2656, Japan</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Full width flex */}
                                <div className="flex items-center justify-between p-6 border border-neutral-200 rounded-xl">
                                    <div className="flex space-x-2">
                                        <div>
                                            <FileInfoIcon className="w-4 h-4 text-neutral-500" stroke={1.5} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-neutral-500">
                                                Type
                                            </div>
                                            <div className="text-2xl capitalize">
                                                Information
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <div>
                                            <CalendarIcon className="w-4 h-4 text-neutral-500" stroke={1.5} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-neutral-500">
                                                Created At
                                            </div>
                                            <div className="text-2xl capitalize">
                                                {moment().format('MMMM DD, YYYY')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <div>
                                            <CalendarIcon className="w-4 h-4 text-neutral-500" stroke={1.5} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-neutral-500">
                                                Updated At
                                            </div>
                                            <div className="text-2xl capitalize">
                                                {moment().format('MMMM DD, YYYY')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs text-neutral-500">Lists</span>
                            <div className="p-6 space-y-6 text-xs border rounded-xl border-neutral-200">
                                {/* Detail data */}
                                <Divider content="Detail Data" className="font-medium" />
                                <div className="flex space-x-2">
                                    <div>
                                        <DollarIcon className="w-4 h-4" stroke={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="font-medium">Currency</div>
                                        <div>IDR</div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <div>
                                        <TrendingUpIcon className="w-4 h-4" stroke={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="font-medium">Rate</div>
                                        <div>1.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </AppLayout>
    )
}

export default Other