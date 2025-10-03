import type { FC } from "react"
import { Menu, Settings } from "lucide-react"
import { Searchbar } from "../Searchbar"
import { Notification } from "../Notification"
import { AccountMenu } from "../AccountMenu"
import { useSidebar } from "../../contexts/sidebar-context/SidebarContextProvider"



const Header: FC = () => {
    const { setIsSidebarOpen } = useSidebar()
    return (
        <header className="flex w-full items-center justify-between bg-items-light dark:bg-items-dark h-[70px] shrink-0">
            <div className="ml-3 sm:ml-[31px] flex items-center w-2/3 sm:w-1/2">
                <button className="mr-3 sm:mr-[24px] cursor-pointer" onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}>
                    <Menu className="text-text-light dark:text-text-dark" />
                </button>
                <Searchbar size="md" />
            </div>
            <div className="flex items-center w-1/3 sm:w-1/2 justify-end">
                <Notification className="mr-3 sm:mr-[31px]">
                    <Notification.Item Icon={Settings} title="notification" desicription="go to notification" />
                    <Notification.Item Icon={Settings} title="notification" desicription="go to notification" />
                    <Notification.Item Icon={Settings} title="notification" desicription="go to notification" />
                    <Notification.Item Icon={Settings} title="notification" desicription="go to notification" />
                    <Notification.Item Icon={Settings} title="notification" desicription="go to notification" />
                </Notification>

                <AccountMenu avatar='https://avatar.iran.liara.run/public' name="Lulu" role='Admin' className="md:mr-[31px] mr-3">
                    <AccountMenu.Item label="Manage Account" Icon={Settings} onClick={() => null} />
                    <AccountMenu.Item label="Manage Account" Icon={Settings} onClick={() => null} />
                    <AccountMenu.Item label="Manage Account" Icon={Settings} onClick={() => null} />
                    <AccountMenu.Item label="Manage Account" Icon={Settings} onClick={() => null} />
                </AccountMenu>
            </div>

        </header>
    )
}


export default Header