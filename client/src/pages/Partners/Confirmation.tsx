import { TriangleAlert } from "lucide-react"
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"
import { handleSubmit } from "../../utils/handleSubmit";
import toast from "react-hot-toast";
import type { Partner } from "../../types/partners";

interface ConfirmationProps {
    confirmationOpen: boolean;
    setConfirmationOpen: Dispatch<SetStateAction<boolean>>;
    selectedPartner: Partner | null;
    setSelectedPartner: Dispatch<SetStateAction<Partner | null>>;
    refetch: () => void;
}


const Confirmation: FC<ConfirmationProps> = (
    {
        confirmationOpen,
        setConfirmationOpen,
        selectedPartner,
        setSelectedPartner,
        refetch,
    }
) => {
    const [isPartnerDeleting, setIsPartnerDeleting] = useState(false)

    const handleDelete = () => {
        if (!selectedPartner) return;

        handleSubmit({
            url: `/partners/${selectedPartner.id}`,
            method: "DELETE",
            onSuccess: () => {
                toast.success("Partner deleted successfully");
                setSelectedPartner(null);
                setConfirmationOpen(false);
                refetch();
            },
            onError: (err) => {
                toast.error(err);
            },
            setLoading: setIsPartnerDeleting, // optional: if you have a delete loading state
        });
    };

    return (
        <ConfirmationDialog open={confirmationOpen} setOpen={setConfirmationOpen}>
            <ConfirmationDialog.Body
                Icon={TriangleAlert}
                title="Delete User"
                description={`Are you sure you want to delete ${selectedPartner?.name}? this action can not be undone.`}
                buttonLabel="Delete"
                loading={isPartnerDeleting}
                onSubmit={handleDelete}
                iconClass="text-red-600 w-9 h-9"
            />
        </ConfirmationDialog>
    )
}

export default Confirmation