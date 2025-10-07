import { SquarePen, Trash2 } from "lucide-react"
import { ActionButtons } from "../../components/ActionButtons"
import { Table } from "../../components/Table"
import { cn } from "../../components/classNames"
import type { User } from "../../types/user"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"
import Confirmation from "./Confirmation"
import EditForm from "./EditForm"



interface UsersTableProps {
    users: User[];
    formData: Omit<User, "id" | "avatar">;
    setFormData: Dispatch<SetStateAction<Omit<User, "id" | "avatar">>>;
    refetch: () => void;
    handleFormDataChange: () => void;
}



const UsersTable: FC<UsersTableProps> = ({ users, formData, setFormData, handleFormDataChange, refetch }) => {

    const [editFormOpen, setEditFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);



    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setFormData({
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            role: user.role,
            status: user.status,
            password: "",
        });
        setEditFormOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setConfirmationOpen(true)
    }

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


    return (
        <>
            <Confirmation
                confirmationOpen={confirmationOpen}
                setConfirmationOpen={setConfirmationOpen}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                refetch={refetch}
            />
            <EditForm
                editFormOpen={editFormOpen}
                setEditFormOpen={setEditFormOpen}
                formData={formData}
                selectedUser={selectedUser}
                refetch={refetch}
                resetFormData={resetFormData}
                setSelectedUser={setSelectedUser}
                handleFormDataChange={handleFormDataChange}
            />
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
                                        <ActionButtons.Button
                                            Icon={Trash2}
                                            type="icon"
                                            iconClass="text-red-600 dark:text-red-400"
                                            onClick={() => handleDeleteClick(user)}
                                        />
                                    </ActionButtons>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
        </>
    )
}


export default UsersTable