import { SquarePen, Trash2 } from "lucide-react"
import { ActionButtons } from "../../components/ActionButtons"
import { Table } from "../../components/Table"
import type { Partner } from "../../types/partners"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"
import Confirmation from "./Confirmation"
import EditForm from "./EditForm"


interface PartnersTableProps {
    partners: Partner[];
    formData: Omit<Partner, "id">;
    setFormData: Dispatch<SetStateAction<Omit<Partner, "id">>>;
    refetch: () => void;
    handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}



const PartnersTable: FC<PartnersTableProps> = ({ partners, formData, setFormData, refetch, handleFormDataChange }) => {


    const [editFormOpen, setEditFormOpen] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);



    const handleEditClick = (partner: Partner) => {
        setSelectedPartner(partner);
        setFormData({
            name: partner.name,
            company: partner.company,
            email: partner.email,
            type: partner.type,
            joined: partner.joined,
        });
        setEditFormOpen(true);
    };

    const handleDeleteClick = (partner: Partner) => {
        setSelectedPartner(partner);
        setConfirmationOpen(true)
    }

    const resetFormData = () => {
        setFormData({
            name: "",
            company: "",
            email: "",
            type: "Investor",
            joined: "",
        });
    }



    return (
        <>
            <Confirmation
                confirmationOpen={confirmationOpen}
                setConfirmationOpen={setConfirmationOpen}
                selectedPartner={selectedPartner}
                setSelectedPartner={setSelectedPartner}
                refetch={refetch}
            />
            <EditForm
                editFormOpen={editFormOpen}
                setEditFormOpen={setEditFormOpen}
                formData={formData}
                selectedPartner={selectedPartner}
                refetch={refetch}
                resetFormData={resetFormData}
                setSelectedPartner={setSelectedPartner}
                handleFormDataChange={handleFormDataChange}
            />
            <Table>
                <Table.Head>
                    <Table.HeadRow>
                        <Table.HeadCell>
                            NAME
                        </Table.HeadCell>
                        <Table.HeadCell>
                            Company
                        </Table.HeadCell>
                        <Table.HeadCell>
                            EMAIL
                        </Table.HeadCell>
                        <Table.HeadCell centered>
                            TYPE
                        </Table.HeadCell>
                        <Table.HeadCell>
                            JOIND
                        </Table.HeadCell>
                        <Table.HeadCell centered>
                            Actions
                        </Table.HeadCell>

                    </Table.HeadRow>
                </Table.Head>
                <Table.Body>
                    {partners.map((partner: Partner) => {
                        return (
                            <Table.Row key={partner.email}>
                                <Table.Cell>
                                    {partner.name}
                                </Table.Cell>
                                <Table.Cell>
                                    {partner.company}
                                </Table.Cell>
                                <Table.Cell>
                                    {partner.email}
                                </Table.Cell>
                                <Table.Cell centered>
                                    <Table.Status color={partner.type === "Partner" ? "red"
                                        : partner.type === "Investor" ? "blue"
                                            : partner.type === "Supplier" ? "green"
                                                : "yellow"
                                    }>
                                        {partner.type}
                                    </Table.Status>
                                </Table.Cell>
                                <Table.Cell>
                                    {partner.joined}
                                </Table.Cell>
                                <Table.Cell centered>
                                    <ActionButtons>
                                        <ActionButtons.Button
                                            Icon={SquarePen}
                                            type="icon"
                                            onClick={() => handleEditClick(partner)}
                                        />
                                        <ActionButtons.Button
                                            Icon={Trash2}
                                            type="icon"
                                            iconClass="text-red-600 dark:text-red-400"
                                            onClick={() => handleDeleteClick(partner)}
                                        />
                                    </ActionButtons>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
        </>
    )
}

export default PartnersTable