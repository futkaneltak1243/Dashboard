import { Dashboard } from "../components/Dashboard"
import { Sidebar } from "../components/Sidebar"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <Dashboard>
            <Sidebar>
                <Sidebar.Header>
                    Furkan
                </Sidebar.Header>
            </Sidebar>
            <Dashboard.Content>
                <Header></Header>
                <Outlet />
            </Dashboard.Content>
        </Dashboard>
    )
}

export default Layout