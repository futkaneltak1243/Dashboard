import { useCallback, useState } from "react"
import { Button } from "../components/Button"
import { FilterBar } from "../components/Filter"
import { Table } from "../components/Table"
import { Searchbar } from "../components/Searchbar"

const Users = () => {
    const roleFilters = ['Super Admin', 'Admin', 'Manager', 'Seller', 'Delivery Agent', 'Customer']
    const statusFilters = ['active', 'inactive', 'pending']
    const [selectedRoleFiltres, setSelectedRoleFilteres] = useState<string[]>([])
    const [selectedStatusFilters, setSelectedStatusFilters] = useState<string[]>([])

    const handleRoleFilterSelect = useCallback((filter: string) => {
        setSelectedRoleFilteres((prev: string[]) => {
            if (prev.includes(filter)) {
                return prev.filter((f: string) => f !== filter)
            }
            return [...prev, filter]

        })
    }, [])

    const handleStatusFilterSelect = useCallback((filter: string) => {
        setSelectedStatusFilters((prev: string[]) => {
            if (prev.includes(filter)) {
                return prev.filter((f: string) => f !== filter)
            }
            return [...prev, filter]

        })
    }, [])

    const users = [
        [1, "Alice Johnson", "alicej", "alice@example.com", "Admin", "active"],
        [2, "Bob Smith", "bobsmith", "bob@example.com", "Customer", "inactive"],
        [3, "Charlie Brown", "charlieb", "charlie@example.com", "Seller", "active"],
        [4, "Diana Prince", "dianap", "diana@example.com", "Admin", "active"],
        [5, "Ethan Hunt", "ethanh", "ethan@example.com", "Customer", "pending"],
        [6, "Fiona White", "fionaw", "fiona@example.com", "Seller", "inactive"]
    ]
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Users</h1>
            <div className="flex justify-end mt-4">
                <Button>Add User</Button>
            </div>
            <div className="mt-7">
                <FilterBar breakPoint='md'>
                    <FilterBar.Filter >
                        <FilterBar.Button label="Role" />
                        <FilterBar.Popover title="Select a role" description="*you can choose multible roles" buttonClick={() => null} buttonLabel="Apply Now">
                            {roleFilters.map((filter: string, index: number) => {
                                return <FilterBar.Option key={index} selected={selectedRoleFiltres.includes(filter)} label={filter} onClick={() => handleRoleFilterSelect(filter)} />

                            })}

                        </FilterBar.Popover>
                    </FilterBar.Filter>

                    <FilterBar.Filter >
                        <FilterBar.Button label="Status" />
                        <FilterBar.Popover title="Select Status" description="*you can choose multible status" buttonClick={() => null} buttonLabel="Apply Now">
                            {statusFilters.map((filter: string, index: number) => {
                                return <FilterBar.Option key={index} selected={selectedStatusFilters.includes(filter)} label={filter} onClick={() => handleStatusFilterSelect(filter)} />

                            })}

                        </FilterBar.Popover>
                    </FilterBar.Filter>
                </FilterBar>
            </div>
            <div className="mt-4 flex justify-end">
                <Searchbar color="default" size="sm" placeholder="Search Product..." />
            </div>
            <div className="mt-4">
                <Table>
                    <Table.Head>
                        <Table.HeadRow>
                            <Table.HeadCell>
                                ID
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Full Name
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Username
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Email
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Role
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Status
                            </Table.HeadCell>
                        </Table.HeadRow>
                    </Table.Head>
                    <Table.Body>
                        {users.map((user: (number | string)[]) => {
                            return (<Table.Row>{
                                user.map((field: string | number) => {
                                    return <Table.Cell>{field}</Table.Cell>
                                })
                            }</Table.Row>)
                        })}

                    </Table.Body>
                </Table>

            </div>

        </div>
    )
}

export default Users