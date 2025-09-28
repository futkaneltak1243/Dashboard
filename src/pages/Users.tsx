import { useCallback, useState } from "react"
import { Button } from "../components/Button"
import { FilterBar } from "../components/Filter"
import { Table } from "../components/Table"
import { Searchbar } from "../components/Searchbar"
import { ActionButtons } from "../components/ActionButtons"
import { ChevronLeft, ChevronRight, SquarePen, Trash2 } from "lucide-react"



type UserStatus = "active" | "inactive" | "pending";

type UserRole = "Admin" | "Customer" | "Seller";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
}

// JSON array of users
const users: User[] = [
    {
        id: 1,
        name: "Alice Johnson",
        username: "alicej",
        email: "alice@example.com",
        role: "Admin",
        status: "active"
    },
    {
        id: 2,
        name: "Bob Smith",
        username: "bobsmith",
        email: "bob@example.com",
        role: "Customer",
        status: "inactive"
    },
    {
        id: 3,
        name: "Charlie Brown",
        username: "charlieb",
        email: "charlie@example.com",
        role: "Seller",
        status: "active"
    },
    {
        id: 4,
        name: "Diana Prince",
        username: "dianap",
        email: "diana@example.com",
        role: "Admin",
        status: "active"
    },
    {
        id: 5,
        name: "Ethan Hunt",
        username: "ethanh",
        email: "ethan@example.com",
        role: "Customer",
        status: "pending"
    },
    {
        id: 6,
        name: "Fiona White",
        username: "fionaw",
        email: "fiona@example.com",
        role: "Seller",
        status: "inactive"
    }
];

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
                                FULL NAME
                            </Table.HeadCell>
                            <Table.HeadCell>
                                USERNAME
                            </Table.HeadCell>
                            <Table.HeadCell>
                                EMAIL
                            </Table.HeadCell>
                            <Table.HeadCell>
                                ROLE
                            </Table.HeadCell>
                            <Table.HeadCell>
                                STATUS
                            </Table.HeadCell>
                            <Table.HeadCell>
                                ACTIONS
                            </Table.HeadCell>
                        </Table.HeadRow>
                    </Table.Head>
                    <Table.Body>
                        {users.map((user: User) => {
                            return (
                                <Table.Row key={user.email}>
                                    <Table.Cell>
                                        {user.id}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.username}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.email}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Table.Status color={user.role === "Admin" ? "red"
                                            : user.role === "Customer" ? "green"
                                                : "yellow"
                                        }>
                                            {user.role}
                                        </Table.Status>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Table.Status color={user.status === "active" ? "green"
                                            : user.status === "inactive" ? "red"
                                                : "blue"
                                        }>
                                            {user.status}
                                        </Table.Status>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ActionButtons>
                                            <ActionButtons.Button Icon={SquarePen} type="icon" />
                                            <ActionButtons.Button Icon={Trash2} type="icon" iconColor="red" />
                                        </ActionButtons>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}

                    </Table.Body>
                </Table>
                <div className="flex justify-end mt-[20px]">
                    <ActionButtons>
                        <ActionButtons.Button type="icon" Icon={ChevronLeft} />
                        <ActionButtons.Button type="icon" Icon={ChevronRight} />
                    </ActionButtons>
                </div>

            </div>

        </div>
    )
}

export default Users