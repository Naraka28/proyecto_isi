//import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';////
////import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Search } from "../components/Search";

interface Header {
    //onClick:()=>void;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

{/*
//export function Header({ }: Header) {
    const navigation = [
        { name: 'Home', href: '#', current: true },
        { name: 'About', href: '#', current: false },
        { name: 'Contact', href: '#', current: false },
    ];

    return (
        <Disclosure as="nav" className="bg-[#0F172A] m-3 rounded-3xl">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                       
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="src/images/Logo.png"
                                className="h-12 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-4 pb-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.current ? 'bg-[#E8B86D] text-[#0F172A]' : 'text-[#EEEEEE] hover:bg-[#FCDE70] focus:bg-[#FCDE70] hover:text-[#0F172A] focus:text-[#0F172A]',
                                        'mt-1 px-3 py-2 rounded-full shadow-xs font-sans font-normal transition-all hover:duration-500 focus:duration-0 manrope-400'
                                    )}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div> 

                    {/* Aqui va el search 
                    <Search className='hidden sm:flex'/>

                    {/* Profile dropdown             
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown 
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-[#393E46] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="src/images/Usuario.jpeg"
                                        className="h-10 w-10 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Your Profile
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Settings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Sign out
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-[#E8B86D] text-[#0F172A]' : 'text-[#EEEEEE] hover:bg-[#FCDE70] focus:bg-[#FCDE70] hover:text-[#0F172A] focus:text-[#0F172A]',
                                'mt-2 px-3 py-2 rounded-full shadow-xs font-sans font-normal transition-all hover:duration-500 focus:duration-0 manrope-400'
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}

*/}