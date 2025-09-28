import { ActionButtons } from "../components/ActionButtons"
import { Button } from "../components/Button"
import { Searchbar } from "../components/Searchbar"
import { Table } from "../components/Table"
import { ChevronLeft, ChevronRight, MapPin, SquarePen, Trash2 } from "lucide-react"

type Exhibition = {
    Title: string
    Location: string
    Organizer: string
    Dates: string
    Status: "Upcoming" | "Ongoing" | "Completed" | "Planned"
    Capacity: number
}

const exhibitions: Exhibition[] = [
    {
        Title: "Tech Expo 2025",
        Location: "Berlin, Germany",
        Organizer: "Global Tech Events",
        Dates: "2025-03-15 to 2025-03-18",
        Status: "Upcoming",
        Capacity: 5000,
    },
    {
        Title: "Art & Culture Fair",
        Location: "Paris, France",
        Organizer: "ArtWorld Association",
        Dates: "2025-05-01 to 2025-05-07",
        Status: "Upcoming",
        Capacity: 1200,
    },
    {
        Title: "Green Energy Summit",
        Location: "Amsterdam, Netherlands",
        Organizer: "EcoFuture Org",
        Dates: "2025-07-20 to 2025-07-22",
        Status: "Planned",
        Capacity: 3000,
    },
    {
        Title: "Medical Innovations Expo",
        Location: "New York, USA",
        Organizer: "HealthTech Group",
        Dates: "2024-12-10 to 2024-12-12",
        Status: "Completed",
        Capacity: 4500,
    },
    {
        Title: "Gaming World Conference",
        Location: "Tokyo, Japan",
        Organizer: "NextGen Gaming",
        Dates: "2025-09-05 to 2025-09-09",
        Status: "Ongoing",
        Capacity: 8000,
    },
]



const Exhibitions = () => {
    return (
        <div className="p-[15px] md:p-[30px] w-full overflow-x-scroll">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Exhibitions</h1>
            <div className="flex justify-end mt-4">
                <Button>Add Exhibition</Button>
            </div>
            <div className="mt-4 flex justify-start">
                <Searchbar color="default" size="sm" placeholder="Search By Title..." />
            </div>
            <div className="mt-4">

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
                                STATUS
                            </Table.HeadCell>
                            <Table.HeadCell>
                                CAPACITY
                            </Table.HeadCell>
                            <Table.HeadCell>
                                ACTIONS
                            </Table.HeadCell>
                        </Table.HeadRow>

                    </Table.Head>
                    <Table.Body>
                        {exhibitions.map((exhibition: Exhibition) => {
                            return (
                                <Table.Row key={exhibition.Title}>
                                    <Table.Cell>
                                        {exhibition.Title}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex items-center">
                                            <MapPin size={15} />
                                            {exhibition.Location}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {exhibition.Organizer}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {exhibition.Dates}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Table.Status
                                            color={exhibition.Status === "Completed" ? "green"
                                                : exhibition.Status === "Upcoming" ? "blue"
                                                    : exhibition.Status === "Ongoing" ? "yellow"
                                                        : "red"
                                            }
                                        >
                                            {exhibition.Status}
                                        </Table.Status>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {exhibition.Capacity}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <ActionButtons>
                                            <ActionButtons.Button Icon={SquarePen} type="icon" />
                                            <ActionButtons.Button Icon={Trash2} type="icon" iconColor="red" />
                                        </ActionButtons>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}

                    </Table.Body>
                </Table>
            </div>

            <div className="flex justify-end mt-[20px]">
                <ActionButtons>
                    <ActionButtons.Button type="icon" Icon={ChevronLeft} />
                    <ActionButtons.Button type="icon" Icon={ChevronRight} />
                </ActionButtons>
            </div>

        </div>

    )
}

export default Exhibitions