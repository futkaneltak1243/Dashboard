import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { FormDialog } from "../../components/FormDialog"
import { handleSubmit } from "../../utils/handleSubmit";
import toast from "react-hot-toast";
import type { Exhibition, ExhibitionStatus } from "../../types/exhibitions";


interface EditFormProps {
    editFormOpen: boolean;
    setEditFormOpen: Dispatch<SetStateAction<boolean>>;
    formData: Omit<Exhibition, "id">;
    selectedExhibition: Exhibition | null;
    refetch: () => void;
    resetFormData: () => void;
    setSelectedExhibition: Dispatch<SetStateAction<Exhibition | null>>;
    handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const exhibitionStatuses: ExhibitionStatus[] = ["Upcoming", "Ongoing", "Completed", "Planned"]

const EditForm: FC<EditFormProps> = (
    {
        editFormOpen,
        setEditFormOpen,
        formData,
        selectedExhibition,
        refetch,
        resetFormData,
        setSelectedExhibition,
        handleFormDataChange,
    }
) => {

    const [isEditFormSubmitting, setIsEditFormSubmitting] = useState(false);


    const handleEditFormSubmit = () => {
        if (!selectedExhibition) return;
        handleSubmit({
            url: `/exhibitions/${selectedExhibition.id}`,
            method: "PUT",
            data: formData,
            onSuccess: () => {
                toast.success("Exhibition updated successfully");
                setEditFormOpen(false);
                resetFormData();
                setSelectedExhibition(null);
                refetch();
            },
            onError: (err) => toast.error(err),
            setLoading: setIsEditFormSubmitting,
        });
    };


    return (
        <FormDialog open={editFormOpen} setOpen={setEditFormOpen}>
            <FormDialog.Body
                title="Edit Exhibition"
                buttonLabel="Update"
                loading={isEditFormSubmitting}
                onSubmit={handleEditFormSubmit}
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
                    name="date"
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
            </FormDialog.Body>
        </FormDialog>
    )
}

export default EditForm