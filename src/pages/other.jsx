import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import AppLayout from "layouts/app-layout"
import Transition from "components/transition"
import { AlertTriangleIcon, AsteriskIcon, BranchIcon, CalendarIcon, DollarIcon, FileInfoIcon, FilterIcon, MailIcon, PhoneIcon, PlusIcon, TrendingUpIcon } from "components/icons"
import { Banner, Divider } from "components"
import ModalExample from "pages/other/modal"
import moment from "moment"
import Tabs from "components/tabs"
import { useEffect, useRef, useState } from "react"

// eCharts
import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { PieChart, BarChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'
import QRCode from "components/qr-code"

const Other = ({ title }) => {
    const location = useLocation()

    const [activeTab, setActiveTab] = useState('home')

    const dataPie = useRef()
    const dataPie2 = useRef()
    const dataBar = useRef()

    useEffect(() => {
        const options = {
            tooltip: {
                trigger: 'item',
                textStyle: {
                    fontSize: 10,
                    fontFamily: 'Poppins'
                }
            },
            legend: {
                type: 'scroll',
                bottom: '5%',
                left: 'center',
                textStyle: {
                    fontSize: 10,
                    fontFamily: 'Poppins'
                }
            },
            series: [
                {
                    name: 'Stats',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    avoidLabelOverlap: true,
                    itemStyle: {
                        borderRadius: 100
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 12,
                            fontFamily: 'Poppins'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 10, name: 'Petty Cash', itemStyle: { color: '#808080' } },
                        { value: 40, name: 'Bill', itemStyle: { color: '#404040' } },
                        { value: 30, name: 'Invoice', itemStyle: { color: '#676767' } },
                        { value: 20, name: 'Transaction', itemStyle: { color: '#262626' } }
                    ]
                }
            ]
        }

        // Initialize eChart
        echarts.use([
            TooltipComponent,
            LegendComponent,
            PieChart,
            SVGRenderer,
            LabelLayout
        ])

        echarts.init(dataPie.current).setOption(options)
    }, [dataPie])

    useEffect(() => {
        const options = {
            tooltip: {
                trigger: 'item',
                textStyle: {
                    fontSize: 10,
                    fontFamily: 'Poppins'
                }
            },
            series: [
                {
                    name: 'Stats',
                    type: 'pie',
                    radius: '50%',
                    label: {
                        fontFamily: 'Poppins',
                        fontSize: 12
                    },
                    data: [
                        { value: 10, name: 'Petty Cash', itemStyle: { color: '#808080' } },
                        { value: 40, name: 'Bill', itemStyle: { color: '#404040' } },
                        { value: 30, name: 'Invoice', itemStyle: { color: '#676767' } },
                        { value: 20, name: 'Transaction', itemStyle: { color: '#262626' } }
                    ]
                }
            ]
        }

        // Initialize eChart
        echarts.use([
            TooltipComponent,
            LegendComponent,
            PieChart,
            SVGRenderer,
            LabelLayout
        ])

        echarts.init(dataPie2.current).setOption(options)
    }, [dataPie2])

    useEffect(() => {
        const options = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [
                        { value: 120, itemStyle: { color: '#808080' } },
                        { value: 200, itemStyle: { color: '#404040' } },
                        { value: 90, itemStyle: { color: '#676767' } },
                        { value: 140, itemStyle: { color: '#808080' } },
                        { value: 150, itemStyle: { color: '#404040' } },
                        { value: 100, itemStyle: { color: '#808080' } },
                        { value: 80, itemStyle: { color: '#676767' } }
                    ],
                    type: 'bar'
                }
            ]
        }

        // Initialize eChart
        echarts.use([
            GridComponent,
            BarChart,
            SVGRenderer
        ])

        echarts.init(dataBar.current).setOption(options)
    }, [dataBar])

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
                            <span className="text-xs text-neutral-500">Banner</span>
                            <div className="p-4 space-y-4 text-xs border rounded-xl">
                                <div>
                                    <Banner type="default" icon={(<AsteriskIcon className="w-6 h-6" />)} title="This is an example of default banner" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolor aliquid earum, alias tempore harum nobis accusantium reiciendis molestias, fugiat, in ad. Ab quo qui, accusantium maiores dicta fugit laborum." />
                                </div>
                                <div>
                                    <Banner type="danger" icon={(<AlertTriangleIcon className="w-6 h-6" />)} title="This is an example of danger banner" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores dolor aliquid earum, alias tempore harum nobis accusantium reiciendis molestias, fugiat, in ad. Ab quo qui, accusantium maiores dicta fugit laborum." />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs text-neutral-500">Headings</span>
                            <div className="flex flex-col p-4 space-y-4 border rounded-xl">
                                {/* Heading 1 */}
                                <div className="space-y-2">
                                    <span className="text-xs text-neutral-500">Heading 1</span>
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

                                {/* Heading 2 */}
                                <div className="space-y-2">
                                    <span className="text-xs text-neutral-500">Heading 2</span>
                                    <div className="flex flex-col px-4 pt-4 space-y-8 border rounded-xl">
                                        {/* Data with Icon */}
                                        <div className="flex space-x-4">
                                            <div className="w-auto">
                                                <div className="w-48 h-48 overflow-hidden aspect-square rounded-xl bg-neutral-100">
                                                    <img className="w-full aspect-square" src="https://placehold.co/200x200?font=roboto" alt="" srcset="" />
                                                </div>
                                            </div>
                                            <div className="w-full pr-2 space-y-4">
                                                <div className="space-y-2">
                                                    <div className="text-2xl font-medium">Veilside</div>
                                                    <div className="text-xs text-neutral-600">
                                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem quod molestias quibusdam ullam aliquam reprehenderit dolores ipsam id fuga soluta facilis sed esse, doloremque quo voluptatum perspiciatis, velit ducimus? Maxime.
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 text-xs">
                                                    <button className="inline-flex px-4 py-3 space-x-2 text-center text-white transition bg-neutral-800 rounded-xl active:hover:scale-90">
                                                        <span>Edit Veilside</span>
                                                    </button>
                                                    <button className="inline-flex items-center px-4 py-3 space-x-2 transition border border-neutral-200 bg-neutral-50 rounded-xl active:hover:scale-90">
                                                        <MailIcon className="w-4 h-4" stroke={1.5} />
                                                    </button>
                                                    <button className="inline-flex items-center px-4 py-3 space-x-2 transition border border-neutral-200 bg-neutral-50 rounded-xl active:hover:scale-90">
                                                        <PhoneIcon className="w-4 h-4" stroke={1.5} />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="p-4 border border-dashed bg-neutral-50/50 rounded-xl">
                                                            <div className="text-lg font-semibold">1</div>
                                                            <div className="font-medium">Outlet</div>
                                                        </div>
                                                        <div className="p-4 border border-dashed bg-neutral-50/50 rounded-xl">
                                                            <div className="text-lg font-semibold">2</div>
                                                            <div className="font-medium">Employees</div>
                                                        </div>
                                                    </div>
                                                    <QRCode value="https://polaroid-party.vercel.app" size={64} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tabs */}
                                        <Tabs layoutId="veilside-tabs" links={[{ label: "Home", action: () => setActiveTab('home'), active: activeTab === 'home' }, { label: "Other", action: () => setActiveTab('other'), active: activeTab === 'other' }]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Charts */}
                        <div className="space-y-2">
                            <span className="text-xs text-neutral-500">Charts</span>
                            <div className="flex flex-wrap gap-4 p-4 border rounded-xl">
                                <div className="space-y-2">
                                    <span className="text-xs text-neutral-500">Pie</span>
                                    <div className="overflow-hidden border rounded-xl">
                                        <div id="pie" ref={dataPie} className="w-auto h-56 aspect-video"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-xs text-neutral-500">Pie 2</span>
                                    <div className="overflow-hidden border rounded-xl">
                                        <div id="pie2" ref={dataPie2} className="w-auto h-56 aspect-video"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-xs text-neutral-500">Bar</span>
                                    <div className="overflow-hidden border rounded-xl">
                                        <div id="bar" ref={dataBar} className="w-auto h-56 aspect-video"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* List */}
                        <div className="space-y-2">
                            <span className="text-xs text-neutral-500">List</span>
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

                        {/* Grid */}
                        <div className="space-y-2">
                            <span className="text-xs text-neutral-500">Grid</span>
                            <div className="grid grid-cols-3 gap-4 p-4 border rounded-xl">
                                {/* Loop 5 times */}
                                {[...Array(5)].map(() => (
                                    <div className="p-4 border rounded-xl text-neutral-800 bg-neutral-50/50 border-neutral-200">
                                        <div className="flex items-center space-x-4">
                                            {/* Icon */}
                                            <div className="p-2 rounded-lg bg-neutral-100">
                                                <AsteriskIcon className="w-4 h-4" />
                                            </div>
                                            <span>Title</span>
                                        </div>
                                        <div className="mt-4 text-lg font-medium">
                                            <span>Title</span>
                                        </div>
                                        <div className="mt-2 text-sm text-neutral-500">
                                            <p><span className="font-medium text-neutral-800">Lorem</span> ipsum dolor sit amet consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </AppLayout>
    )
}

export default Other