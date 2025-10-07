import { TriangleAlert } from "lucide-react"
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"
import type { User } from "../../types/user";
import { handleSubmit } from "../../utils/handleSubmit";
import toast from "react-hot-toast";

interface ConfirmationProps {
    confirmationOpen: boolean;
    setConfirmationOpen: Dispatch<SetStateAction<boolean>>;
    selectedUser: User | null;
    setSelectedUser: Dispatch<SetStateAction<User | null>>;
    refetch: () => void;
}


const Confirmation: FC<ConfirmationProps> = (
    {
        confirmationOpen,
        setConfirmationOpen,
        selectedUser,
        setSelectedUser,
        refetch,
    }
) => {
    const [isUserDeleting, setIsUserDeleting] = useState(false)

    const handleDelete = () => {
        if (!selectedUser) return;

        handleSubmit({
            url: `/users/${selectedUser.id}`,
            method: "DELETE",
            onSuccess: () => {
                toast.success("User deleted successfully");
                setSelectedUser(null);
                setConfirmationOpen(false);
                refetch();
            },
            onError: (err) => {
                toast.error(err);
            },
            setLoading: setIsUserDeleting, // optional: if you have a delete loading state
        });
    };

    return (
        <ConfirmationDialog open={confirmationOpen} setOpen={setConfirmationOpen}>
            <ConfirmationDialog.Body
                Icon={TriangleAlert}
                title="Delete User"
                description={`Are you sure you want to delete ${selectedUser?.fullname}? this action can not be undone.`}
                buttonLabel="Delete"
                loading={isUserDeleting}
                onSubmit={handleDelete}
                iconClass="text-red-600 w-9 h-9"
            />
        </ConfirmationDialog>
    )
}

export default Confirmation