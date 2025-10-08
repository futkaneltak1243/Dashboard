import { MapPin, SquarePen, Trash2 } from "lucide-react"
import { ActionButtons } from "../../components/ActionButtons"
import { Table } from "../../components/Table"
import type { Exhibition } from "../../types/exhibitions"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"
import Confirmation from "./Confirmation"
import EditForm from "./EditForm"



interface ExhibitionTableProps {
    exhibitions: Exhibition[]
    formData: Omit<Exhibition, "id">;
    setFormData: Dispatch<SetStateAction<Omit<Exhibition, "id">>>;
    refetch: () => void;
    handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    resetFormData: () => void;
}


const ExhibitionTable: FC<ExhibitionTableProps> = ({ exhibitions, formData, setFormData, refetch, handleFormDataChange, resetFormData }) => {


    const [editFormOpen, setEditFormOpen] = useState(false);
    const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);



    const handleEditClick = (exhibition: Exhibition) => {
        setSelectedExhibition(exhibition);
        setFormData({
            name: exhibition.name,
            title: exhibition.title,
            location: exhibition.location,
            organizer: exhibition.organizer,
            dates: exhibition.dates,
            status: exhibition.status,
            capacity: exhibition.capacity,
        });
        setEditFormOpen(true);
    };

    const handleDeleteClick = (exhibition: Exhibition) => {
        setSelectedExhibition(exhibition);
        setConfirmationOpen(true)
    }




    return (
        <>
            <Confirmation
                confirmationOpen={confirmationOpen}
                setConfirmationOpen={setConfirmationOpen}
                selectedExhibition={selectedExhibition}
                setSelectedExhibition={setSelectedExhibition}
                refetch={refetch}
            />
            <EditForm
                editFormOpen={editFormOpen}
                setEditFormOpen={setEditFormOpen}
                formData={formData}
                selectedExhibition={selectedExhibition}
                refetch={refetch}
                setSelectedExhibition={setSelectedExhibition}
                handleFormDataChange={handleFormDataChange}
                resetFormData={resetFormData}
            />
            <Table>
                <Table.Head>
                    <Table.HeadRow>
                        <Table.HeadCell>
                            TITLE
                        </Table.HeadCell>
                        <Table.HeadCell>
                            LOCATION
                        </Table.HeadCell>
                        <Table.HeadCell>
                            ORGANIZER
                        </Table.HeadCell>
                        <Table.HeadCell>
                            DATES
                        </Table.HeadCell>
                        <Table.HeadCell>
                            CAPACITY
                        </Table.HeadCell>
                        <Table.HeadCell centered>
                            STATUS
                        </Table.HeadCell>

                        <Table.HeadCell centered>
                            ACTIONS
                        </Table.HeadCell>
                    </Table.HeadRow>

                </Table.Head>
                <Table.Body>
                    {exhibitions.map((exhibition: Exhibition) => {
                        return (
                            <Table.Row key={exhibition.id}>
                                <Table.Cell>
                                    {exhibition.title}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center">
                                        <MapPin size={15} />
                                        {exhibition.location}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    {exhibition.organizer}
                                </Table.Cell>
                                <Table.Cell>
                                    {exhibition.dates}
                                </Table.Cell>
                                <Table.Cell>
                                    {exhibition.capacity}
                                </Table.Cell>
                                <Table.Cell centered>
                                    <Table.Status
                                        color={exhibition.status === "Completed" ? "green"
                                            : exhibition.status === "Upcoming" ? "blue"
                                                : exhibition.status === "Ongoing" ? "yellow"
                                                    : "red"
                                        }
                                    >
                                        {exhibition.status}
                                    </Table.Status>
                                </Table.Cell>

                                <Table.Cell centered>
                                    <ActionButtons>
                                        <ActionButtons.Button
                                            Icon={SquarePen}
                                            type="icon"
                                            onClick={() => handleEditClick(exhibition)}
                                        />
                                        <ActionButtons.Button
                                            Icon={Trash2}
                                            type="icon"
                                            iconClass="text-red-600 dark:text-red-400"
                                            onClick={() => handleDeleteClick(exhibition)}
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

export default ExhibitionTable