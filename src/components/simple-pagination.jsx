import { Link, useLocation } from "react-router-dom"
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "./icons"

const SimplePagination = ({ links, from, to, total }) => {
    const location = useLocation()

    if (links && from && to && total) {
        return (
            <div class="flex items-center justify-between w-full">
                <div class="flex flex-wrap -mb-1">
                    {links.map((row, index) => (
                        <>
                            {index === 0 ? (
                                row.url === null ? (
                                    <div class="px-4 py-2 mb-1 mr-1 text-sm leading-4 text-neutral-400 border rounded-xl"><ArrowNarrowLeftIcon className="w-6 h-6" /></div>
                                ) : (
                                    <Link to={row.url} class={`${row.active ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'hover:bg-neutral-100'} px-4 py-2 mb-1 mr-1 text-sm leading-4 transition border rounded-xl focus:border-neutral-500 active:hover:scale-95`}><ArrowNarrowLeftIcon className="w-6 h-6" /></Link>
                                )
                            ) : index === links.length - 1 && (
                                row.url === null ? (
                                    <div class="px-4 py-2 mb-1 mr-1 text-sm leading-4 text-neutral-400 border rounded-xl"><ArrowNarrowRightIcon className="w-6 h-6" /></div>
                                ) : (
                                    <Link to={row.url} class={`${row.active ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'hover:bg-neutral-100'} px-4 py-2 mb-1 mr-1 text-sm leading-4 transition border rounded-xl focus:border-neutral-500 active:hover:scale-95`}><ArrowNarrowRightIcon className="w-6 h-6" /></Link>
                                )
                            )}
                        </>
                    ))}
                </div>

                <div>
                    <p class="text-sm leading-5 text-neutral-700">
                        Showing
                        <span class="font-medium">{` ${from} `}</span>
                        to
                        <span class="font-medium">{` ${to} `}</span>
                        of
                        <span class="font-medium">{` ${total} `}</span>
                        results
                    </p>
                </div>
            </div>
        )
    }
}

export default SimplePagination