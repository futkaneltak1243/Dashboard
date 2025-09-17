import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import { Sidebar } from './components/Sidebar'
import { Gauge } from "lucide-react"
import { Button } from './components/Button'
import { useSidebar } from './contexts/sidebar-context/SidebarContextProvider'
import { Searchbar } from "./components/Searchbar"
function App() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()
  return (
    <Dashboard >
      <div className='flex h-full'>
        <Sidebar open={isSidebarOpen}>
          <Sidebar.Header>
            Test header
          </Sidebar.Header>
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={true}></Sidebar.NavItem >
          <Sidebar.Separator></Sidebar.Separator>
          <Sidebar.Title label='PAGES' open={isSidebarOpen}></Sidebar.Title>
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => null} selected={false}></Sidebar.NavItem >

        </Sidebar>
        <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)}></Button>
        <Searchbar size="lg"></Searchbar>

      </div>
    </Dashboard>
  )
}

export default App
