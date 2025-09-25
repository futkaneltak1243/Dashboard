import { Dashboard } from "../components/Dashboard"
import { Sidebar } from "../components/Sidebar"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"
import { Gauge } from "lucide-react"

const Layout = () => {
    return (
        <Dashboard>
            <Sidebar>
                <Sidebar.Header>
                    Furkan
                </Sidebar.Header>
                <Sidebar.NavItem Icon={Gauge} title="Dashboard" to="/" />
            </Sidebar>
            <Dashboard.Content>
                <Header></Header>
                <Outlet />
            </Dashboard.Content>
        </Dashboard>
    )
}

export default Layout