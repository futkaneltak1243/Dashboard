import { Dashboard } from "../components/Dashboard"
import { Sidebar } from "../components/Sidebar"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"
import { ChartColumn, UsersRound, Package, SquareMenu, Settings, Heart } from "lucide-react"

const Layout = () => {
    return (
        <Dashboard>
            <Sidebar>
                <Sidebar.Header>
                    Furkan
                </Sidebar.Header>
                <Sidebar.NavItem Icon={ChartColumn} title="Dashboard" to="/" />
                <Sidebar.NavItem Icon={UsersRound} title="Users" to="/users" />
                <Sidebar.NavItem Icon={Package} title="Products" to="/products" />
                <Sidebar.NavItem Icon={Heart} title="Favorites" to="/favorites" />
                <Sidebar.NavItem Icon={SquareMenu} title="Orders" to="/orders" />
                <Sidebar.Separator />
                <Sidebar.NavItem Icon={Settings} title="Settings" to="/settings" />



            </Sidebar>
            <Dashboard.Content>
                <Header></Header>
                <Outlet />
            </Dashboard.Content>
        </Dashboard>
    )
}

export default Layout