import type { FC } from "react"
import { Menu } from "lucide-react"
import { useSidebar } from "../../../contexts/sidebar-context/SidebarContextProvider"

import Search from "./Search"
import Notifications from "./Notifications"
import Account from "./Account"



const Header: FC = () => {
    const { setIsSidebarOpen } = useSidebar()


    return (
        <header className="flex w-full items-center justify-between bg-items-light dark:bg-items-dark h-[70px] shrink-0">
            <div className="ml-3 sm:ml-[31px] flex items-center w-2/3 sm:w-1/2">
                <button className="mr-3 sm:mr-[24px] cursor-pointer" onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}>
                    <Menu className="text-text-light dark:text-text-dark" />
                </button>
                <Search />
            </div>
            <div className="flex items-center w-1/3 sm:w-1/2 justify-end">
                <Notifications />

                <Account />
            </div>

        </header>
    )
}


export default Header