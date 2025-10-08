import { TriangleAlert } from "lucide-react"
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"
import { handleSubmit } from "../../utils/handleSubmit";
import toast from "react-hot-toast";
import type { Exhibition } from "../../types/exhibitions";

interface ConfirmationProps {
    confirmationOpen: boolean;
    setConfirmationOpen: Dispatch<SetStateAction<boolean>>;
    selectedExhibition: Exhibition | null;
    setSelectedExhibition: Dispatch<SetStateAction<Exhibition | null>>;
    refetch: () => void;
}


const Confirmation: FC<ConfirmationProps> = (
    {
        confirmationOpen,
        setConfirmationOpen,
        selectedExhibition,
        setSelectedExhibition,
        refetch,
    }
) => {
    const [isExhibitionDeleting, setIsExhibitionDeleting] = useState(false)

    const handleDelete = () => {
        if (!selectedExhibition) return;

        handleSubmit({
            url: `/exhibitions/${selectedExhibition.id}`,
            method: "DELETE",
            onSuccess: () => {
                toast.success("Exhibition deleted successfully");
                setSelectedExhibition(null);
                setConfirmationOpen(false);
                refetch();
            },
            onError: (err) => {
                toast.error(err);
            },
            setLoading: setIsExhibitionDeleting,
        });
    };

    return (
        <ConfirmationDialog open={confirmationOpen} setOpen={setConfirmationOpen}>
            <ConfirmationDialog.Body
                Icon={TriangleAlert}
                title="Delete User"
                description={`Are you sure you want to delete ${selectedExhibition?.name}? this action can not be undone.`}
                buttonLabel="Delete"
                loading={isExhibitionDeleting}
                onSubmit={handleDelete}
                iconClass="text-red-600 w-9 h-9"
            />
        </ConfirmationDialog>
    )
}

export default Confirmation