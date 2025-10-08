import { useEffect, useState, type FC } from "react"
import { FormDialog } from "../../components/FormDialog"
import { Button } from "../../components/Button"
import { handleSubmit } from "../../utils/handleSubmit"
import toast from "react-hot-toast"
import type { Exhibition, ExhibitionStatus } from "../../types/exhibitions"


interface CreateButtonProps {
    formData: Omit<Exhibition, "id">
    handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    resetFormData: () => void;
    refetch: () => void;

}

const exhibitionStatuses: ExhibitionStatus[] = ["Upcoming", "Ongoing", "Completed", "Planned"]


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
            url: "/exhibitions",
            method: "POST",
            data: formData,
            onSuccess: () => {
                resetFormData();
                toast.success("exhibition added successfully");
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
                <Button>Add Exhibition</Button>
            </FormDialog.Trigger>
            <FormDialog.Body
                title="Add Partner"
                buttonLabel="Save"
                loading={isCeateFormSubmitting}
                onSubmit={handleCreateFormSubmit}
            >
                <FormDialog.TextInput
                    label="Name"
                    name="name"
                    value={formData["name"]}
                    onChange={handleFormDataChange}
                />
                <FormDialog.TextInput
                    label="Title"
                    name="title"
                    value={formData["title"]}
                    onChange={handleFormDataChange}
                />

                <FormDialog.TextInput
                    label="Organizer"
                    name="organizer"
                    value={formData["organizer"]}
                    onChange={handleFormDataChange}
                />


                <FormDialog.DateInput
                    label="Dates"
                    name="dates"
                    value={formData["dates"]}
                    onChange={handleFormDataChange}
                />

                <FormDialog.TextInput
                    label="Capacity"
                    name="capacity"
                    value={String(formData["capacity"])}
                    onChange={handleFormDataChange}
                    type="number"
                />

                <FormDialog.SelectInput
                    label="Status"
                    name="status"
                    options={exhibitionStatuses}
                    value={String(formData["status"])}
                    onChange={handleFormDataChange}
                />

                <FormDialog.TextInput
                    label="Location"
                    name="location"
                    value={String(formData["location"])}
                    onChange={handleFormDataChange}
                    full
                />
            </FormDialog.Body>
        </FormDialog>

    )
}

export default CreateButton