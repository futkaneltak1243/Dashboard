import { Button } from "../components/Button"
import { Searchbar } from "../components/Searchbar"
import { Table } from "../components/Table"

const partners: Partner[] = [
    {
        "name": "Alice Johnson",
        "company": "TechNova",
        "email": "alice.johnson@technova.com",
        "type": "Supplier",
        "joined": "2023-05-14"
    },
    {
        "name": "David Smith",
        "company": "GreenWorld Inc.",
        "email": "david.smith@greenworld.com",
        "type": "Distributor",
        "joined": "2022-11-02"
    },
    {
        "name": "Maria Lopez",
        "company": "Skyline Solutions",
        "email": "maria.lopez@skylinesol.com",
        "type": "Investor",
        "joined": "2024-01-25"
    },
    {
        "name": "James Kim",
        "company": "NextGen Labs",
        "email": "james.kim@nextgenlabs.io",
        "type": "Partner",
        "joined": "2021-08-19"
    },
    {
        "name": "Sophia Carter",
        "company": "BlueWave Systems",
        "email": "sophia.carter@bluewave.com",
        "type": "Supplier",
        "joined": "2023-03-08"
    },
    {
        "name": "Michael Brown",
        "company": "EcoLogix",
        "email": "michael.brown@ecologix.org",
        "type": "Investor",
        "joined": "2022-07-21"
    },
    {
        "name": "Emma Davis",
        "company": "VisionaryWorks",
        "email": "emma.davis@visionaryworks.com",
        "type": "Distributor",
        "joined": "2023-12-01"
    },
    {
        "name": "Daniel Wilson",
        "company": "SmartEdge",
        "email": "daniel.wilson@smartedge.io",
        "type": "Partner",
        "joined": "2021-09-11"
    },
    {
        "name": "Olivia Martinez",
        "company": "BrightPath",
        "email": "olivia.martinez@brightpath.com",
        "type": "Supplier",
        "joined": "2024-02-17"
    },
    {
        "name": "Liam Taylor",
        "company": "UrbanTech",
        "email": "liam.taylor@urbantech.com",
        "type": "Distributor",
        "joined": "2022-10-29"
    },
    {
        "name": "Isabella White",
        "company": "CoreLink",
        "email": "isabella.white@corelink.com",
        "type": "Partner",
        "joined": "2023-06-15"
    },
    {
        "name": "Ethan Harris",
        "company": "FutureWave",
        "email": "ethan.harris@futurewave.com",
        "type": "Investor",
        "joined": "2021-04-23"
    },
    {
        "name": "Mia Thompson",
        "company": "PrimeSource",
        "email": "mia.thompson@primesource.com",
        "type": "Supplier",
        "joined": "2023-09-07"
    },
    {
        "name": "Noah Clark",
        "company": "EverGrow",
        "email": "noah.clark@evergrow.org",
        "type": "Distributor",
        "joined": "2022-05-16"
    },
    {
        "name": "Ava Lewis",
        "company": "BrightStar",
        "email": "ava.lewis@brightstar.com",
        "type": "Partner",
        "joined": "2021-12-30"
    },
    {
        "name": "William Hall",
        "company": "QuantumEdge",
        "email": "william.hall@quantumedge.com",
        "type": "Investor",
        "joined": "2024-03-05"
    },
    {
        "name": "Charlotte Young",
        "company": "NextPath",
        "email": "charlotte.young@nextpath.com",
        "type": "Supplier",
        "joined": "2022-01-14"
    },
    {
        "name": "Benjamin Scott",
        "company": "TechHive",
        "email": "benjamin.scott@techhive.io",
        "type": "Partner",
        "joined": "2023-07-09"
    },
    {
        "name": "Amelia King",
        "company": "Solarix",
        "email": "amelia.king@solarix.org",
        "type": "Distributor",
        "joined": "2021-06-18"
    },
    {
        "name": "Lucas Adams",
        "company": "Innovex",
        "email": "lucas.adams@innovex.com",
        "type": "Investor",
        "joined": "2023-11-22"
    }
]


type PartnerType = "Supplier" | "Distributor" | "Investor" | "Partner";

interface Partner {
    name: string;
    company: string;
    email: string;
    type: PartnerType;
    joined: string;
}

const Partners = () => {
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Partners</h1>
            <div className="flex justify-end mt-4">
                <Button>Add Partner</Button>
            </div>
            <div className="mt-4 flex justify-start">
                <Searchbar color="default" size="sm" placeholder="Search By Name..." />
            </div>
            <div className="mt-4">
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
                            <Table.HeadCell>
                                TYPE
                            </Table.HeadCell>
                            <Table.HeadCell>
                                JOIND
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
                                    <Table.Cell>
                                        {partner.type}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {partner.joined}
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}

                    </Table.Body>
                </Table>

            </div>
        </div>
    )
}

export default Partners