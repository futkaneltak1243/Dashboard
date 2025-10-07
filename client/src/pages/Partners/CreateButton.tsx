import { useEffect, useState, type FC } from "react"
import { FormDialog } from "../../components/FormDialog"
import { Button } from "../../components/Button"
import { handleSubmit } from "../../utils/handleSubmit"
import toast from "react-hot-toast"
import type { Partner, PartnerType } from "../../types/partners"


interface CreateButtonProps {
    formData: Omit<Partner, "id">
    handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    resetFormData: () => void;
    refetch: () => void;

}

const PartnerTypes: PartnerType[] = ["Supplier", "Distributor", "Investor", "Partner"]


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
            url: "/partners",
            method: "POST",
            data: formData,
            onSuccess: () => {
                resetFormData();
                toast.success("partner added successfully");
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
                <Button>Add Partner</Button>
            </FormDialog.Trigger>
            <FormDialog.Body title="Add Partner" buttonLabel="Save" loading={isCeateFormSubmitting} onSubmit={handleCreateFormSubmit}>
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

export default CreateButton