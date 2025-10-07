import { useCallback, useEffect, useState, type ChangeEvent } from "react"
import { Button } from "../components/Button"
import { FilterBar } from "../components/Filter"
import { Table } from "../components/Table"
import { Searchbar } from "../components/Searchbar"
import { ActionButtons } from "../components/ActionButtons"
import { ChevronLeft, ChevronRight, SquarePen, Trash2 } from "lucide-react"
import { cn } from "../components/classNames"
import useFetch from "../hooks/useFetch/useFetch"
import type { UserRole, UserStatus, User, UserFilters } from "../types/user"
import { useLocation } from "react-router-dom"
import useFilters from "../hooks/useFilters/useFilters"
import { FormDialog } from "../components/FormDialog"
import { handleSubmit } from "../utils/handleSubmit"
import toast from "react-hot-toast"


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

    const { setFilters, get } = useFilters<UserFilters>()
    const status = get("status", "array")
    const role = get("role", "array")
    const initialName = get("name", "string")
    const page = get("page", "number")
    const [selectedRoleFiltres, setSelectedRoleFilteres] = useState<UserRole[]>(role ? role : [])
    const [selectedStatusFilters, setSelectedStatusFilters] = useState<UserStatus[]>(status ? status : [])
    const [name, setName] = useState<string>(initialName ? initialName : "")
    const [isCeateFormSubmitting, setIsCeateFormSubmitting] = useState(false)
    const [createFormOpen, setCreateFormOpen] = useState(false)
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        role: "Admin",
        status: "active",
        password: "",

    })
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditFormSubmitting, setIsEditFormSubmitting] = useState(false);
    const location = useLocation()

    const { data, loading, error, refetch } = useFetch<Data>(location.pathname + location.search)

    const resetFormData = () => {
        setFormData({
            fullname: "",
            username: "",
            email: "",
            role: "Admin",
            status: "active",
            password: ""
        });
    }

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setFormData({
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
            password: "", // leave empty unless changing
        });
        setEditFormOpen(true);
    };

    useEffect(() => {
        if (!createFormOpen) {
            resetFormData()
        }
    }, [createFormOpen]);

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateFormSubmit = () => {
        handleSubmit({
            url: "/users",
            method: "POST",
            data: formData,
            onSuccess: () => {
                resetFormData();
                toast.success("user added successfully");
                setCreateFormOpen(false)
                refetch()
            },
            onError: (err) => { toast.error(err) },
            setLoading: setIsCeateFormSubmitting
        })
    }

    const handleEditFormSubmit = () => {
        if (!selectedUser) return;
        console.log(selectedUser.id)
        handleSubmit({
            url: `/users/${selectedUser.id}`,
            method: "PUT",
            data: formData,
            onSuccess: () => {
                toast.success("User updated successfully");
                setEditFormOpen(false);
                resetFormData();
                setSelectedUser(null);
                refetch();
            },
            onError: (err) => toast.error(err),
            setLoading: setIsEditFormSubmitting,
        });
    };



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
                <FormDialog open={editFormOpen} setOpen={setEditFormOpen}>
                    <FormDialog.Body
                        title="Edit User"
                        buttonLabel="Update"
                        loading={isEditFormSubmitting}
                        onSubmit={handleEditFormSubmit}
                    >
                        <FormDialog.TextInput
                            label="Full Name"
                            name="fullname"
                            value={formData["fullname"]}
                            onChange={handleFormDataChange}
                        />

                        <FormDialog.TextInput
                            label="Username"
                            name="username"
                            value={formData["username"]}
                            onChange={handleFormDataChange}
                        />

                        <FormDialog.TextInput
                            label="Email"
                            name="email"
                            value={formData["email"]}
                            onChange={handleFormDataChange}
                            type="email"
                        />

                        <FormDialog.TextInput
                            label="Password"
                            name="password"
                            value={formData["password"]}
                            onChange={handleFormDataChange}
                            type="password"
                        />

                        <FormDialog.SelectInput
                            label="Role"
                            name="role"
                            options={roleFilters.filter(role => role !== "Super Admin")}
                            value={formData["role"]}
                            onChange={handleFormDataChange}
                        />

                        <FormDialog.SelectInput
                            options={statusFilters}
                            name="status"
                            label="Status"
                            value={formData["status"]}
                            onChange={handleFormDataChange}
                        />
                    </FormDialog.Body>
                </FormDialog>
                <FormDialog open={createFormOpen} setOpen={setCreateFormOpen}>
                    <FormDialog.Trigger>
                        <Button>Add User</Button>
                    </FormDialog.Trigger>
                    <FormDialog.Body title="Add User" buttonLabel="Save" loading={isCeateFormSubmitting} onSubmit={handleCreateFormSubmit}>
                        <FormDialog.TextInput
                            label="Full Name"
                            name="fullname"
                            value={formData["fullname"]}
                            onChange={handleFormDataChange}
                        />

                        <FormDialog.TextInput
                            label="Username"
                            name="username"
                            value={formData["username"]}
                            onChange={handleFormDataChange}
                        />

                        <FormDialog.TextInput
                            label="Email"
                            name="email"
                            value={formData["email"]}
                            onChange={handleFormDataChange}
                            type="email"
                        />

                        <FormDialog.TextInput
                            label="Password"
                            name="password"
                            value={formData["password"]}
                            onChange={handleFormDataChange}
                            type="password"
                        />

                        <FormDialog.SelectInput
                            label="Role"
                            name="role"
                            options={roleFilters.filter(role => role !== "Super Admin")}
                            value={formData["role"]}
                            onChange={handleFormDataChange}
                        />

                        <FormDialog.SelectInput
                            options={statusFilters}
                            name="status"
                            label="Status"
                            value={formData["status"]}
                            onChange={handleFormDataChange}
                        />


                    </FormDialog.Body>
                </FormDialog>
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
                                            <ActionButtons.Button
                                                Icon={SquarePen}
                                                type="icon"
                                                onClick={() => handleEditClick(user)}
                                            />
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