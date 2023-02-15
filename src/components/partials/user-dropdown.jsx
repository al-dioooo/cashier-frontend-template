import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from 'components/icons'
import { useAuth } from 'contexts/auth-context'
import { useNavigate } from 'react-router-dom'

export default function UserDropdown() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate(0, { replace: true })
    }

    return (
        <div className="">
            <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2">
                    <div className="overflow-hidden rounded-full w-9 h-9 bg-neutral-300">
                        <img src={`https://ui-avatars.com/api/?name=${user?.name}&format=svg&background=262626&color=f5f5f5`} alt="" />
                    </div>
                    <ChevronDownIcon className="w-4 h-4" />
                </Menu.Button>
                <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95" >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {/* <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button className={`${active ? 'bg-neutral-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                        Icon here
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                        </div> */}
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button onClick={() => handleLogout()} className={`${active ? 'bg-neutral-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                        {/* Icon here */}
                                        Logout
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