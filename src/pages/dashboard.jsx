import { useEffect, useRef, useState } from "react"
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import AppLayout from "layouts/app-layout"
import Transition from "components/transition"
import { lang } from "config"

// eCharts
import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'
import { Banner } from "components"
import { AsteriskIcon, MoodSmileIcon } from "components/icons"

const Dashboard = (props) => {
    const location = useLocation()
    const navigate = useNavigate()

    // Set pie data ref
    const dataPie = useRef()

    // Get data from loader
    // const data = useLoaderData()

    const [transition, setTransition] = useState(location.state?.transition)

    useEffect(() => {
        // Clear cache state and reload page
        if (location.state?.cache === 'clear') {
            window.history.replaceState({}, document.title)
            navigate(0)
        }
    }, [])

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
                top: 'bottom',
                left: 'left',
                textStyle: {
                    fontSize: 10,
                    fontFamily: 'Poppins'
                },
                orient: 'vertical'
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
                        { value: 40, name: 'Petty Cash', itemStyle: { color: '#808080' } },
                        { value: 80, name: 'Bill', itemStyle: { color: '#404040' } },
                        { value: 60, name: 'Invoice', itemStyle: { color: '#676767' } },
                        { value: 60, name: 'Transaction', itemStyle: { color: '#262626' } }
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

    return (
        <AppLayout title={props.title}>
            <div className="p-8 space-y-16">
                <div>
                    <button disabled className="pointer-events-none">
                        <Link to={location.pathname} className="cursor-default">
                            <motion.h1 layout transition={{ duration: .5, type: "tween" }} layoutId={props.title} className="text-3xl font-medium">
                                {props.title}
                            </motion.h1>
                        </Link>
                    </button>
                </div>
                <Transition type={transition}>
                    <div className="space-y-8">
                        <Banner type="default" icon={(<MoodSmileIcon className="w-6 h-6" stroke={1.5} />)} title="Hello there!" subtitle="Take control of your field team’s activities, you are the master of the universe!" />
                        <div className="flex w-full space-x-4">
                            <div className="flex flex-col flex-grow p-4 space-y-4 h-fit bg-neutral-100 rounded-2xl">
                                <div className="grid grid-cols-4 gap-4">
                                    {[...Array(4)].map(() => (
                                        <div className="p-4 space-y-4 text-white bg-neutral-600 topography rounded-xl">
                                            <div>Data</div>
                                            <div className="text-xl font-medium">0 Data</div>
                                        </div>
                                    ))}
                                </div>
                                <div id="pie" ref={dataPie} className="w-auto h-72"></div>
                            </div>
                            <div className="overflow-hidden min-w-max bg-neutral-100 rounded-2xl">
                                <div className="flex flex-col items-center px-8 pt-8 pb-24 space-y-4 rounded-b-xl bg-neutral-200">
                                    <div className="text-xl font-medium">
                                        Overview
                                    </div>
                                    <div className="px-8 py-4 border-2 border-dashed border-neutral-400/25 bg-neutral-300/50 rounded-2xl">
                                        <p className="text-sm">Data</p>
                                        <p className="text-xl font-semibold">1.4k Datas</p>
                                    </div>
                                </div>
                                <div className="p-4 mx-4 mb-4 -mt-16 space-y-4 text-left bg-white rounded-xl">
                                    {[...Array(5)].map(() => (
                                        <div className="flex items-center">
                                            {/* Icon */}
                                            <div className="p-2 rounded-lg bg-neutral-100">
                                                <AsteriskIcon className="w-6 h-6" />
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-medium">Data</p>
                                                <p className="text-sm text-neutral-500">Description</p>
                                            </div>
                                            <div className="ml-8">
                                                <p className="text-xl font-medium">1.4k</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </AppLayout>
    )
}

export default Dashboard