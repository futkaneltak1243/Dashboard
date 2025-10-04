import { useCallback, useState, type ChangeEvent } from "react"
import { Button } from "../components/Button"
import { FilterBar } from "../components/Filter"
import { Table } from "../components/Table"
import { Searchbar } from "../components/Searchbar"
import { ActionButtons } from "../components/ActionButtons"
import { ChevronLeft, ChevronRight, SquarePen, Trash2 } from "lucide-react"
import { cn } from "../components/classNames"
import useFetch from "../hooks/useFetch/useFetch"
import type { UserRole, UserStatus, User } from "../types/user"
import { useUserFilters } from "../hooks/filtersHooks/useUserFilters"
import { useLocation } from "react-router-dom"


interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: User[];
}
const roleFilters: UserRole[] = ['Super Admin', 'Admin', 'Manager', 'Seller', 'Delivery Agent', 'Customer']
const statusFilters: UserStatus[] = ['active', 'inactive', 'pending']

const Users = () => {

    const { setFilters, status, role, name: initialName, page } = useUserFilters()
    const [selectedRoleFiltres, setSelectedRoleFilteres] = useState<UserRole[]>(role ? role : [])
    const [selectedStatusFilters, setSelectedStatusFilters] = useState<UserStatus[]>(status ? status : [])
    const [name, setName] = useState<string>(initialName ? initialName : "")
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

    const handleSearchInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    const handleResetFilters = useCallback(() => {
        setFilters({ page: 1, status: [], role: [], name: "" })
        setName("")
        setSelectedRoleFilteres([])
        setSelectedStatusFilters([])
    }, [setFilters])

    const { data, loading, error } = useFetch<Data>(location.pathname + location.search)


    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    const users = data?.data
    if (!users) return
    const handlePageChange = (p: number) => {
        if (p < 1) return
        if (p > data?.totalPages) return
        setFilters({ page: p })
    }
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Users</h1>
            <div className="flex justify-end mt-4">
                <Button>Add User</Button>
            </div>
            <div className="mt-7">
                <FilterBar
                    breakPoint='md'
                    resetButtonClick={handleResetFilters}
                >
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
                        <FilterBar.Popover title="Select Status" description="*you can choose multible status" buttonClick={() => setFilters({ status: selectedStatusFilters })} buttonLabel="Apply Now">
                            {statusFilters.map((filter: UserStatus, index: number) => {
                                return <FilterBar.Option key={index} selected={selectedStatusFilters.includes(filter)} label={filter} onClick={() => handleStatusFilterSelect(filter)} />

                            })}

                        </FilterBar.Popover>
                    </FilterBar.Filter>
                </FilterBar>
            </div>
            <div className="mt-4 flex justify-end">
                <Searchbar
                    color="default"
                    size="sm"
                    placeholder="Search Users..."
                    buttonClick={() => setFilters({ name: name })}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e)}
                    value={name}
                />
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
                        {users.map((user: User) => {
                            return (
                                <Table.Row key={user.id}>
                                    <Table.Cell>
                                        {user.id}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.fullname}
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
                <div className="flex justify-between mt-[20px]">
                    <p className="text-sm text-midgray">
                        showing {1 + data.limit * (data.page - 1)}-{Math.min(data.limit * data.page, data.total)} of {data.total}
                    </p>
                    <ActionButtons>
                        <ActionButtons.Button
                            type="icon"
                            Icon={ChevronLeft}
                            onClick={() => handlePageChange(page ? page - 1 : 1)}
                            disabled={page === 1}
                        />
                        <ActionButtons.Button
                            type="icon"
                            Icon={ChevronRight}
                            onClick={() =>
                                handlePageChange(page ? page + 1 : 1)}
                            disabled={page === data.totalPages}
                        />
                    </ActionButtons>
                </div>

            </div>

        </div>
    )
}

export default Users