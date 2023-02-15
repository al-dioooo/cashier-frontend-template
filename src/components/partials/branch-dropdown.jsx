import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ChevronDownIcon } from 'components/icons'
import useBranchesByUser from 'repositories/branch-by-user'
import { useAuth } from 'contexts/auth-context'
import { redirect, useLocation, useNavigate } from 'react-router-dom'

const BranchDropdown = () => {
    if (true) {
        return (
            <div className="">
                <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center space-x-2 text-sm">
                        <span>Veilside</span>
                        <ChevronDownIcon className="w-4 h-4" />
                    </Menu.Button>
                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
                        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y rounded-md divide-neutral-100 ring-1 ring-offset-4 ring-black ring-opacity-5 focus:outline-none">
                            <div className="flex items-center px-1 pt-1 pb-2 space-x-2 text-xs text-neutral-700">
                                <span className="text-[0.5rem] px-4 py-1 bg-neutral-800 text-white rounded-full">Select Item</span>
                            </div>
                            <div className="pt-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button onClick={() => { }} className={`${active ? 'bg-neutral-800 text-white' : 'text-neutral-800'} group w-full flex flex-col rounded-md px-2 py-2 text-sm`}>
                                            <span>Veilside</span>
                                            <span className={`${active ? 'text-neutral-200' : 'text-neutral-600'} -mx-1 mt-2 flex flex-wrap items-center space-x-1 text-xs`}>
                                                <span className={`px-2 py-1 m-1 text-xs rounded-full ${active ? 'text-neutral-100 bg-neutral-700' : 'text-neutral-500 bg-neutral-100'}`}>One Above All</span>
                                            </span>
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button onClick={() => { }} className={`${active ? 'bg-neutral-800 text-white' : 'text-neutral-800'} group w-full flex flex-col rounded-md px-2 py-2 text-sm`}>
                                            <span>Rocket Bunny</span>
                                            <span className={`${active ? 'text-neutral-200' : 'text-neutral-600'} -mx-1 mt-2 flex flex-wrap items-center space-x-1 text-xs`}>
                                                <span className={`px-2 py-1 m-1 text-xs rounded-full ${active ? 'text-neutral-100 bg-neutral-700' : 'text-neutral-500 bg-neutral-100'}`}>One Above All</span>
                                            </span>
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button onClick={() => { }} className={`${active ? 'bg-neutral-800 text-white' : 'text-neutral-800'} group w-full flex flex-col rounded-md px-2 py-2 text-sm`}>
                                            <span>Liberty Walk</span>
                                            <span className={`${active ? 'text-neutral-200' : 'text-neutral-600'} -mx-1 mt-2 flex flex-wrap items-center space-x-1 text-xs`}>
                                                <span className={`px-2 py-1 m-1 text-xs rounded-full ${active ? 'text-neutral-100 bg-neutral-700' : 'text-neutral-500 bg-neutral-100'}`}>Finance</span>
                                                <span className={`px-2 py-1 m-1 text-xs rounded-full ${active ? 'text-neutral-100 bg-neutral-700' : 'text-neutral-500 bg-neutral-100'}`}>Reporter</span>
                                            </span>
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        )
    }
}

export default BranchDropdown