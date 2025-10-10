import { useState, type FC } from "react";
import { FormDialog } from "../../components/FormDialog"
import { handleSubmit } from "../../utils/handleSubmit";
import type { Product } from "../../types/product";
import toast from "react-hot-toast";
import { uploadImages } from "../../utils/uploadImages";

interface EditFormProps {
    editFormOpen: boolean;
    setEditFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    formData: { name: string, price: string };
    handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    serverImages: string[];
    setServerImages: (images: string[]) => void;
    files: File[];
    setFiles: (files: File[]) => void;
    selectedProduct: Product | null;
    refetch: () => void;
}

const EditForm: FC<EditFormProps> = ({
    editFormOpen,
    setEditFormOpen,
    formData,
    handleFormDataChange,
    serverImages,
    setServerImages,
    files,
    setFiles,
    selectedProduct,
    refetch
}) => {
    const [isEditFormSubmitting, setIsEditFormSubmitting] = useState(false);

    const handleEditFormSubmit = async () => {

        if (!selectedProduct) return;
        setIsEditFormSubmitting(true)
        try {
            console.log(files)
            const imageUrls = files.length ? await uploadImages(files) : []
            handleSubmit({
                url: `/products/${selectedProduct.id}`,
                method: "PUT",
                data: { ...formData, images: [...serverImages, ...imageUrls] },
                onSuccess: () => {
                    toast.success("product updated successfully");
                    setEditFormOpen(false);
                    refetch();
                },
                onError: (err) => toast.error(err),
            });
        } catch (error: any) {
            toast.error(error?.message || "failed uploading images")
        } finally {
            setIsEditFormSubmitting(false)
        }
    };

    return (
        <FormDialog open={editFormOpen} setOpen={setEditFormOpen}>
            <FormDialog.Body
                buttonLabel="Update"
                onSubmit={handleEditFormSubmit}
                loading={isEditFormSubmitting}
            >
                <FormDialog.TextInput
                    label="Name"
                    name="name"
                    value={formData['name']}
                    onChange={handleFormDataChange}
                />
                <FormDialog.TextInput
                    label="Price"
                    name="price"
                    type="number"
                    value={String(formData['price'])}
                    onChange={handleFormDataChange}
                />
                <FormDialog.ImageInput
                    label="Images"
                    serverImages={serverImages}
                    setServerImages={setServerImages}
                    files={files}
                    setFiles={setFiles}

                />
            </FormDialog.Body>
        </FormDialog>
    )
}


export default EditForm