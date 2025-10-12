import { useState, type FC } from "react"
import { Menu, Settings } from "lucide-react"
import { Searchbar } from "../Searchbar"
import { Notification } from "../Notification"
import { AccountMenu } from "../AccountMenu"
import { useSidebar } from "../../contexts/sidebar-context/SidebarContextProvider"
import { Link } from "react-router-dom"
import useFetch from "../../hooks/useFetch/useFetch"
import { useDebounce } from "../../hooks/useDebounce"

type SearchItem = {
    location: string;
    key: string;
    link: string;
}

type Data = SearchItem[]

const Header: FC = () => {
    const { setIsSidebarOpen } = useSidebar()
    const [key, setKey] = useState("")
    const debouncedKey = useDebounce(key)
    const { data } = useFetch<Data>(debouncedKey ? `/search?key=${debouncedKey}` : null);

    const searchData = key ? data || [] : [];

    return (
        <header className="flex w-full items-center justify-between bg-items-light dark:bg-items-dark h-[70px] shrink-0">
            <div className="ml-3 sm:ml-[31px] flex items-center w-2/3 sm:w-1/2">
                <button className="mr-3 sm:mr-[24px] cursor-pointer" onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}>
                    <Menu className="text-text-light dark:text-text-dark" />
                </button>
                <div className="w-full relative">
                    <Searchbar size="md" value={key} onChange={(e) => setKey(e.target.value)} />
                    {searchData.length > 0 && (
                        <div className="absolute top-10 left-0 w-full max-w-[393px] bg-white rounded-lg border border-lightgray shadow-lg overflow-hidden divide-y-[1px] divide-lightgray z-50">
                            {searchData.map((item: SearchItem, index: number) => (
                                <Link
                                    key={index}
                                    to={item.link}
                                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                >
                                    <p className="text-sm font-medium text-gray-800">{item.location}</p>
                                    <p className="text-xs text-gray-500"># {item.key}</p>
                                </Link>
                            ))}
                        </div>
                    )}


                </div>
            </div>
            <div className="flex items-center w-1/3 sm:w-1/2 justify-end">
                <Notification className="mr-3 sm:mr-[31px]" zIndex={100}>
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