import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { FormDialog } from "../../components/FormDialog"
import { handleSubmit } from "../../utils/handleSubmit";
import toast from "react-hot-toast";
import type { Partner, PartnerType } from "../../types/partners";


interface EditFormProps {
    editFormOpen: boolean;
    setEditFormOpen: Dispatch<SetStateAction<boolean>>;
    formData: Omit<Partner, "id">;
    selectedPartner: Partner | null;
    refetch: () => void;
    resetFormData: () => void;
    setSelectedPartner: Dispatch<SetStateAction<Partner | null>>;
    handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PartnerTypes: PartnerType[] = ["Supplier", "Distributor", "Investor", "Partner"]

const EditForm: FC<EditFormProps> = (
    {
        editFormOpen,
        setEditFormOpen,
        formData,
        selectedPartner,
        refetch,
        resetFormData,
        setSelectedPartner,
        handleFormDataChange,
    }
) => {

    const [isEditFormSubmitting, setIsEditFormSubmitting] = useState(false);


    const handleEditFormSubmit = () => {
        if (!selectedPartner) return;
        handleSubmit({
            url: `/partners/${selectedPartner.id}`,
            method: "PUT",
            data: formData,
            onSuccess: () => {
                toast.success("Partner updated successfully");
                setEditFormOpen(false);
                resetFormData();
                setSelectedPartner(null);
                refetch();
            },
            onError: (err) => toast.error(err),
            setLoading: setIsEditFormSubmitting,
        });
    };


    return (
        <FormDialog open={editFormOpen} setOpen={setEditFormOpen}>
            <FormDialog.Body
                title="Edit Partner"
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

                <FormDialog.SelectInput
                    label="Type"
                    name="type"
                    options={PartnerTypes}
                    value={formData["type"]}
                    onChange={handleFormDataChange}
                />

                <FormDialog.TextInput
                    label="Company"
                    name="company"
                    value={formData["company"]}
                    onChange={handleFormDataChange}
                />

                <FormDialog.DateInput
                    label="Joined"
                    name="joined"
                    value={formData["joined"]}
                    onChange={handleFormDataChange}
                />

                <FormDialog.TextInput
                    label="Email"
                    name="email"
                    value={formData["email"]}
                    onChange={handleFormDataChange}
                    type="email"
                    full
                />
            </FormDialog.Body>
        </FormDialog>
    )
}

export default EditForm