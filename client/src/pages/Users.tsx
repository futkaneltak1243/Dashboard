import { useCallback, useState } from "react"
import { Button } from "../components/Button"
import { FilterBar } from "../components/Filter"
import { Table } from "../components/Table"
import { Searchbar } from "../components/Searchbar"
import { ActionButtons } from "../components/ActionButtons"
import { ChevronLeft, ChevronRight, SquarePen, Trash2 } from "lucide-react"
import { cn } from "../components/classNames"
import useFetch from "../hooks/useFetch/useFetch"
import type { UserRole, UserStatus } from "../types/user"
import { useUserFilters } from "../hooks/filtersHooks/useUserFilters"
import { useLocation } from "react-router-dom"





interface User {
    id: number;
    full_name: string;
    username: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    avatar: string | "null"

}



const Users = () => {

    const { setFilters, status, role } = useUserFilters()

    const roleFilters: UserRole[] = ['Super Admin', 'Admin', 'Manager', 'Seller', 'Delivery Agent', 'Customer']
    const statusFilters: UserStatus[] = ['active', 'inactive', 'pending']
    const [selectedRoleFiltres, setSelectedRoleFilteres] = useState<UserRole[]>(role ? role : [])
    const [selectedStatusFilters, setSelectedStatusFilters] = useState<UserStatus[]>(status ? status : [])
    const location = useLocation()

    const handleRoleFilterSelect = useCallback((filter: UserRole) => {
        setSelectedRoleFilteres((prev: UserRole[]) => {
            if (prev.includes(filter)) {
                return prev.filter((f: UserRole) => f !== filter)
            }
            return [...prev, filter]

        })
    }, [])

    const handleStatusFilterSelect = useCallback((filter: UserStatus) => {
        setSelectedStatusFilters((prev: UserStatus[]) => {
            if (prev.includes(filter)) {
                return prev.filter((f: UserStatus) => f !== filter)
            }
            return [...prev, filter]

        })
    }, [])


    const { data, loading, error } = useFetch<User[]>(location.pathname + location.search)



    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!data) return
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
                        <FilterBar.Popover title="Select a role" description="*you can choose multible roles" buttonClick={() => setFilters({ role: selectedRoleFiltres })} buttonLabel="Apply Now">
                            {roleFilters.map((filter: UserRole, index: number) => {
                                return <FilterBar.Option key={index} selected={selectedRoleFiltres.includes(filter)} label={filter} onClick={() => handleRoleFilterSelect(filter)} />

                            })}

                        </FilterBar.Popover>
                    </FilterBar.Filter>

                    <FilterBar.Filter >
                        <FilterBar.Button label="Status" />
                        <FilterBar.Popover title="Select Status" description="*you can choose multible status" buttonClick={() => null} buttonLabel="Apply Now">
                            {statusFilters.map((filter: UserStatus, index: number) => {
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
                            <Table.HeadCell centered>
                                ROLE
                            </Table.HeadCell>
                            <Table.HeadCell centered>
                                STATUS
                            </Table.HeadCell>
                            <Table.HeadCell centered>
                                ACTIONS
                            </Table.HeadCell>
                        </Table.HeadRow>
                    </Table.Head>
                    <Table.Body>
                        {data.map((user: User) => {
                            return (
                                <Table.Row key={user.id}>
                                    <Table.Cell>
                                        {user.id}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.full_name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.username}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.email}
                                    </Table.Cell>
                                    <Table.Cell centered>
                                        <Table.Status
                                            color={user.role === "Admin" || user.role === "Super Admin" ? "red"
                                                : user.role === "Customer" ? "green"
                                                    : user.role === "Manager" ? "blue"
                                                        : "yellow"
                                            }
                                            className={cn({ "text-[10px]": user.role === "Delivery Agent" })}
                                        >
                                            {user.role}
                                        </Table.Status>
                                    </Table.Cell>
                                    <Table.Cell centered>
                                        <Table.Status color={user.status === "active" ? "green"
                                            : user.status === "inactive" ? "red"
                                                : "blue"
                                        }>
                                            {user.status}
                                        </Table.Status>
                                    </Table.Cell>
                                    <Table.Cell centered>
                                        <ActionButtons>
                                            <ActionButtons.Button Icon={SquarePen} type="icon" />
                                            <ActionButtons.Button Icon={Trash2} type="icon" iconClass="text-red-600 dark:text-red-400" />
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