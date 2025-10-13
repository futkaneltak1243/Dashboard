import { Dashboard } from "../components/Dashboard"
import { Sidebar } from "../components/Sidebar"
import { Header } from "../components/advaned/"
import { Outlet } from "react-router-dom"
import { ChartColumn, UsersRound, Package, SquareMenu, Settings, Heart, Handshake, Calendar, Bell } from "lucide-react"
import { Toaster } from "react-hot-toast"
import { useSidebar } from "../contexts/sidebar-context/SidebarContextProvider"

const Layout = () => {
    const { isSidebarOpen } = useSidebar()
    return (
        <Dashboard>
            <Sidebar>
                <Sidebar.Header>
                    {
                        isSidebarOpen ?
                            <p className="text-black dark:text-white font-semibold">Furkan<span className="text-primary">Dashboard</span></p> :
                            <p className="text-black dark:text-white font-semibold">Furkan</p>

                    }
                </Sidebar.Header>
                <Sidebar.NavItem Icon={ChartColumn} title="Dashboard" to="/" />
                <Sidebar.NavItem Icon={UsersRound} title="Users" to="/users" />
                <Sidebar.NavItem Icon={Package} title="Products" to="/products" />
                <Sidebar.NavItem Icon={Heart} title="Favorites" to="/favorites" />
                <Sidebar.NavItem Icon={SquareMenu} title="Orders" to="/orders" />
                <Sidebar.NavItem Icon={Handshake} title="Partners" to="/partners" />
                <Sidebar.NavItem Icon={Calendar} title="Exhibitions" to="/exhibitions" />
                <Sidebar.NavItem Icon={Bell} title="Notifications" to="/notifications" />


                <Sidebar.Separator />
                <Sidebar.NavItem Icon={Settings} title="Settings" to="/settings" />



            </Sidebar>
            <Dashboard.Content>
                <Header></Header>
                <Outlet />
                <Toaster position="top-right" />
            </Dashboard.Content>
        </Dashboard>
    )
}

export default Layout