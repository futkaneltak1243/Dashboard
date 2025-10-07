import { useEffect, useState, type FC } from "react"
import { FormDialog } from "../../components/FormDialog"
import { Button } from "../../components/Button"
import type { User, UserRole, UserStatus } from "../../types/user"
import { handleSubmit } from "../../utils/handleSubmit"
import toast from "react-hot-toast"


interface CreateButtonProps {
    formData: Omit<User, "id" | "avatar">
    handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    resetFormData: () => void;
    refetch: () => void;

}

const UserRole: UserRole[] = ['Super Admin', 'Admin', 'Manager', 'Seller', 'Delivery Agent', 'Customer']
const UserStatus: UserStatus[] = ['active', 'inactive', 'pending']

const CreateButton: FC<CreateButtonProps> = (
    {
        formData,
        handleFormDataChange,
        resetFormData,
        refetch,
    }
) => {
    const [createFormOpen, setCreateFormOpen] = useState(false);
    const [isCeateFormSubmitting, setIsCeateFormSubmitting] = useState(false)


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

    useEffect(() => {
        if (!createFormOpen) {
            resetFormData()
        }
    }, [createFormOpen]);
    return (
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

export default CreateButton