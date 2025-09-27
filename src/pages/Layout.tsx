import { Dashboard } from "../components/Dashboard"
import { Sidebar } from "../components/Sidebar"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"
import { Gauge, UsersRound, Package, SquareMenu } from "lucide-react"

const Layout = () => {
    return (
        <Dashboard>
            <Sidebar>
                <Sidebar.Header>
                    Furkan
                </Sidebar.Header>
                <Sidebar.NavItem Icon={Gauge} title="Dashboard" to="/" />
                <Sidebar.NavItem Icon={UsersRound} title="Users" to="/users" />
                <Sidebar.NavItem Icon={Package} title="Products" to="/products" />
                <Sidebar.NavItem Icon={SquareMenu} title="Orders" to="/orders" />



            </Sidebar>
            <Dashboard.Content>
                <Header></Header>
                <Outlet />
            </Dashboard.Content>
        </Dashboard>
    )
}

export default Layout