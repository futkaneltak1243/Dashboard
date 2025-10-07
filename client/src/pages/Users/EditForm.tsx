import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { FormDialog } from "../../components/FormDialog"
import type { User, UserRole, UserStatus } from "../../types/user";
import { handleSubmit } from "../../utils/handleSubmit";
import toast from "react-hot-toast";


interface EditFormProps {
    editFormOpen: boolean;
    setEditFormOpen: Dispatch<SetStateAction<boolean>>;
    formData: Omit<User, "id" | "avatar">;
    selectedUser: User | null;
    refetch: () => void;
    resetFormData: () => void;
    setSelectedUser: Dispatch<SetStateAction<User | null>>;
    handleFormDataChange: () => void;
}

const UserRole: UserRole[] = ['Super Admin', 'Admin', 'Manager', 'Seller', 'Delivery Agent', 'Customer']
const UserStatus: UserStatus[] = ['active', 'inactive', 'pending']

const EditForm: FC<EditFormProps> = (
    {
        editFormOpen,
        setEditFormOpen,
        formData,
        selectedUser,
        refetch,
        resetFormData,
        setSelectedUser,
        handleFormDataChange,
    }
) => {

    const [isEditFormSubmitting, setIsEditFormSubmitting] = useState(false);


    const handleEditFormSubmit = () => {
        if (!selectedUser) return;
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


    return (
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
                    options={UserRole.filter(role => role !== "Super Admin")}
                    value={formData["role"]}
                    onChange={handleFormDataChange}
                />

                <FormDialog.SelectInput
                    options={UserStatus}
                    name="status"
                    label="Status"
                    value={formData["status"]}
                    onChange={handleFormDataChange}
                />
            </FormDialog.Body>
        </FormDialog>
    )
}

export default EditForm