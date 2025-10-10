import { useCallback, useEffect, useState, type FC } from "react"
import { Button } from "../../components/Button"
import { FormDialog } from "../../components/FormDialog"
import { handleSubmit } from "../../utils/handleSubmit"
import { uploadImages } from "../../utils/uploadImages"
import toast from "react-hot-toast"

interface CreateButtonProps {
    refetch: () => void
}


const CreateButton: FC<CreateButtonProps> = ({ refetch }) => {

    const [formData, setFormData] = useState({
        name: "",
        price: ""
    })
    const [files, setFiles] = useState<File[]>([]);
    const [createFormOpen, setCreateFormOpen] = useState(false);
    const [isCeateFormSubmitting, setIsCeateFormSubmitting] = useState(false)

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetFormData = useCallback(() => {
        setFormData({
            name: "",
            price: "",
        })
        setFiles([])
    }, [])

    const handleCreateFormSubmit = async () => {
        setIsCeateFormSubmitting(true)
        try {
            const imageUrls = files.length ? await uploadImages(files) : undefined
            handleSubmit({
                url: "/products",
                method: "POST",
                data: { ...formData, images: imageUrls },
                onSuccess: () => {
                    resetFormData();
                    toast.success("product added successfully");
                    setCreateFormOpen(false)
                    refetch()
                },
                onError: (err) => { toast.error(err) },
            })
        } catch (error: any) {
            toast.error(error?.message || "failed uploading images")
        } finally {
            setIsCeateFormSubmitting(false)
        }
    }

    useEffect(() => {

        if (createFormOpen) resetFormData()

    }, [createFormOpen]);

    return (
        <FormDialog open={createFormOpen} setOpen={setCreateFormOpen}>
            <FormDialog.Trigger>
                <Button>Add Product</Button>
            </FormDialog.Trigger>
            <FormDialog.Body
                buttonLabel="Save"
                onSubmit={handleCreateFormSubmit}
                loading={isCeateFormSubmitting}
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
                    files={files}
                    setFiles={setFiles}

                />
            </FormDialog.Body>
        </FormDialog>
    )
}


export default CreateButton