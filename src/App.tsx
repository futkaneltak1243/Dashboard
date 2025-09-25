import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import { Sidebar } from './components/Sidebar'
import { Gauge, Settings } from "lucide-react"
import { useSidebar } from './contexts/sidebar-context/SidebarContextProvider'
import { Button } from './components/Button'
import { useTheme } from './contexts/theme-context/ThemeContextProvider'
import { FilterBar } from './components/Filter'
import { Notification } from './components/Notification'
import { AccountMenu } from './components/AccountMenu'
import { Header } from './components/Header'
import { Chart, StatGrid } from './components/analytics'
import { User2 } from "lucide-react"
import { Products } from "./components/Products"

function App() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()
  const { theme, setTheme } = useTheme()
  const images = [
    "https://picsum.photos/360/320",
    "https://picsum.photos/540/420",
    "https://picsum.photos/760/520",
  ]

  return (
    <Dashboard >
      <div className='flex h-full items-start'>
        <Sidebar open={isSidebarOpen}>
          <Sidebar.Header>
            Test header
          </Sidebar.Header>
          <Sidebar.NavItem title="Dashboard" Icon={Gauge} open={isSidebarOpen} onClick={() => setIsSidebarOpen(prev => !prev)} selected={false}></Sidebar.NavItem >
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

        <div className='flex flex-col flex-1 min-w-0 overflow-y-scroll max-h-screen'>
          <Header></Header>
          <div>







            <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}></Button>
            <Button onClick={() => setIsSidebarOpen(prev => !prev)}></Button>

            <FilterBar breakPoint='lg'>
              <FilterBar.Filter>
                <FilterBar.Button label='Order Status' />
                <FilterBar.Popover title='Seleect a status' description='*you can choose multible Status ' buttonClick={() => null} buttonLabel='Apply now'>
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />


                </FilterBar.Popover>

              </FilterBar.Filter>

              <FilterBar.Filter>
                <FilterBar.Button label='Order Status' />
                <FilterBar.Popover title='Seleect a status' description='*you can choose multible Status ' buttonClick={() => null} buttonLabel='Apply now'>
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />


                </FilterBar.Popover>

              </FilterBar.Filter>


              <FilterBar.Filter>
                <FilterBar.Button label='Order Status' />
                <FilterBar.Popover title='Seleect a status' description='*you can choose multible Status ' buttonClick={() => null} buttonLabel='Apply now'>
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />


                </FilterBar.Popover>

              </FilterBar.Filter>


              <FilterBar.Filter>
                <FilterBar.Button label='Order Status' />
                <FilterBar.Popover title='Seleect a status' description='*you can choose multible Status ' buttonClick={() => null} buttonLabel='Apply now'>
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />
                  <FilterBar.Option label='this option' selected={false} />


                </FilterBar.Popover>

              </FilterBar.Filter>

            </FilterBar>

            <Notification notificationCount={4}>
              <Notification.Item title='Settings' desicription='Update Dashboard' Icon={Settings} />
              <Notification.Item title='Settings' desicription='Update Dashboard' Icon={Settings} />
              <Notification.Item title='Settings' desicription='Update Dashboard' Icon={Settings} />
              <Notification.Item title='Settings' desicription='Update Dashboard' Icon={Settings} />
              <Notification.Item title='Settings' desicription='Update Dashboard' Icon={Settings} />

            </Notification>



            <Products>
              <Products.Product images={images} title='Apple Watch Series 4 ' price={120} isFavorites={false} />
              <Products.Product images={images} title='Apple Watch Series 4 ' price={120} isFavorites={false} />
              <Products.Product images={images} title='Apple Watch Series 4 ' price={120} isFavorites={false} />
              <Products.Product images={images} title='Apple Watch Series 4 ' price={120} isFavorites={false} />
              <Products.Product images={images} title='Apple Watch Series 4 ' price={120} isFavorites={false} />
              <Products.Product images={images} title='Apple Watch Series 4 ' price={120} isFavorites={false} />



            </Products>


          </div>

        </div>

      </div>
    </Dashboard>
  )
}

export default App
