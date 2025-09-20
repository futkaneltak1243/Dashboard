import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import { Sidebar } from './components/Sidebar'
import { Gauge } from "lucide-react"
import { useSidebar } from './contexts/sidebar-context/SidebarContextProvider'
import { Filter } from "./components/Filter"
import { Button } from './components/Button'
import { useTheme } from './contexts/theme-context/ThemeContextProvider'
import { Table } from './components/Table'
import { useState, useRef } from 'react'
import { TriggerWithPopover } from './components/TriggerWithPopover'
function App() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()
  const { theme, setTheme } = useTheme()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)
  const [openP, setOpenP] = useState<boolean>(false)
  return (
    <Dashboard >
      <div className='flex h-full items-start'>
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

        <div className='flex flex-col flex-1 min-w-0'>
          <div>

            <TriggerWithPopover>
              <TriggerWithPopover.Trigger >
                trigger
              </TriggerWithPopover.Trigger>
              <TriggerWithPopover.Popover >
                popover
              </TriggerWithPopover.Popover>
            </TriggerWithPopover>
            <TriggerWithPopover>
              <TriggerWithPopover.Trigger >
                trigger
              </TriggerWithPopover.Trigger>
              <TriggerWithPopover.Popover >
                popover
              </TriggerWithPopover.Popover>
            </TriggerWithPopover>

            <Filter>
              <Filter.Button label='Orders' >
              </Filter.Button>
              <Filter.Popover buttonLabel='Apply Now' buttonClick={() => console.log('Clicked')} title='Select Order Status' description='*You can choose multiple Order Status' >
                <div>hi</div>
                <div>hi</div>
                <div>hi</div>
              </Filter.Popover >
            </Filter>

            <Filter>
              <Filter.Button label='Orders' >
              </Filter.Button>
              <Filter.Popover buttonLabel='Apply Now' buttonClick={() => console.log('Clicked')} title='Select Order Status' description='*You can choose multiple Order Status' >
                <div>hi</div>
                <div>hi</div>
                <div>hi</div>
              </Filter.Popover >
            </Filter>



            <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}></Button>
          </div>
          <div className=' m-5'>
            <Table>
              <Table.Head>
                <Table.HeadRow>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Job</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>

                </Table.HeadRow>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    0001,
                  </Table.Cell>
                  <Table.Cell>
                    Furkn 134314344343r fsfs lm fm smf mm l flmsfl mmlcekckc knds ,dn m,dn dm ndm,n dmn d,mn dn,md,m nm,d ,mn,m dssmkl mlmd  dlmsk mdm mdml dmml dlm ld dcn md,n mdn, nmd, ndmnm,n d,mdn mnd,dm nndm n,dn n dm nm,n md,nm dnndmnmd nm,nd ndm dn ,ndmn dn dn dnm nmnm dndn d, ,d ndmn ,md,m nmdn mn dmnd mnmdn mndm,n ,md ,ndn mnm d,nmd nmdn m,dnm nmsdnmnd, nnm nmd nm, nmnm dnmd ,nd m dnm, n,, n dnfdnfm,ndm,ndm,fnm,dfnmnfd,mnfdmndm,nm,dfndfm,
                  </Table.Cell>
                  <Table.Cell>
                    Developer dksmfk sm kds ks kd kmk mk m mk k m km km km mm k
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Status color='blue'>
                      pending
                    </Table.Status>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

          </div>
        </div>

      </div>
    </Dashboard>
  )
}

export default App
