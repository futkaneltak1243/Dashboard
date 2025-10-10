import { TriangleAlert } from "lucide-react"
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog"
import { useState, type FC } from "react";
import type { Product } from "../../types/product";
import { handleSubmit } from "../../utils/handleSubmit";
import toast from "react-hot-toast";

interface ConfiramtionProps {
    confirmationOpen: boolean;
    setConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedProduct: Product | null;
    refetch: () => void;
}


const Confiramtion: FC<ConfiramtionProps> = ({
    confirmationOpen,
    setConfirmationOpen,
    selectedProduct,
    refetch,
}) => {


    const [isProductDeleting, setIsProductDeleting] = useState(false)

    const handleDelete = () => {
        if (!selectedProduct) return;

        handleSubmit({
            url: `/products/${selectedProduct.id}`,
            method: "DELETE",
            onSuccess: () => {
                toast.success("Product deleted successfully");
                setConfirmationOpen(false);
                refetch();
            },
            onError: (err) => {
                toast.error(err);
            },
            setLoading: setIsProductDeleting,
        });
    };


    return (
        <ConfirmationDialog open={confirmationOpen} setOpen={setConfirmationOpen}>
            <ConfirmationDialog.Body
                Icon={TriangleAlert}
                title="Delete Product"
                description={`Are you sure you want to delete ${selectedProduct?.name}? this action can not be undone.`}
                buttonLabel="Delete"
                loading={isProductDeleting}
                onSubmit={handleDelete}
                iconClass="text-red-600 w-9 h-9"
            />
        </ConfirmationDialog>
    )
}

export default Confiramtion