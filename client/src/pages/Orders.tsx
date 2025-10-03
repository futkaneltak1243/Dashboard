import { useCallback, useState } from "react";
import { FilterBar } from "../components/Filter";
import { Table } from "../components/Table";
import { ActionButtons } from "../components/ActionButtons";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

type Order = {
    id: number;
    name: string;
    address: string;
    date: string;
    type: 'Health & Medicine' | 'Book & Stationary' | 'Services & Industry' | 'Fashion & Beauty' | 'Home & Living' | 'Electronics' | 'Mobile & Phone' | 'Accessories';
    status: 'Completed' | 'Processing' | 'Rejected' | 'On Hold' | 'In Transit';
};

const orders: Order[] = [
    { id: 1, name: "Alice Johnson", address: "123 Maple St, NY", date: "2025-09-01", type: "Health & Medicine", status: "Completed" },
    { id: 2, name: "Bob Smith", address: "456 Oak Ave, LA", date: "2025-09-02", type: "Book & Stationary", status: "Processing" },
    { id: 3, name: "Charlie Davis", address: "789 Pine Rd, TX", date: "2025-09-03", type: "Fashion & Beauty", status: "Rejected" },
    { id: 4, name: "Diana White", address: "321 Birch Blvd, FL", date: "2025-09-04", type: "Home & Living", status: "On Hold" },
    { id: 5, name: "Ethan Brown", address: "654 Cedar Ln, WA", date: "2025-09-05", type: "Electronics", status: "In Transit" },
    { id: 6, name: "Fiona Green", address: "987 Spruce Ct, IL", date: "2025-09-06", type: "Mobile & Phone", status: "Completed" },
    { id: 7, name: "George King", address: "159 Elm St, CO", date: "2025-09-07", type: "Accessories", status: "Processing" },
    { id: 8, name: "Hannah Scott", address: "753 Willow Way, NV", date: "2025-09-08", type: "Health & Medicine", status: "Rejected" },
    { id: 9, name: "Ian Adams", address: "852 Aspen Dr, OH", date: "2025-09-09", type: "Book & Stationary", status: "On Hold" },
    { id: 10, name: "Jane Wilson", address: "963 Cherry Pl, MI", date: "2025-09-10", type: "Fashion & Beauty", status: "In Transit" },
    { id: 11, name: "Kyle Moore", address: "147 Poplar St, NY", date: "2025-09-11", type: "Home & Living", status: "Completed" },
    { id: 12, name: "Laura Taylor", address: "258 Fir Rd, LA", date: "2025-09-12", type: "Electronics", status: "Processing" },
    { id: 13, name: "Mike Anderson", address: "369 Palm Ave, TX", date: "2025-09-13", type: "Mobile & Phone", status: "Rejected" },
    { id: 14, name: "Nina Martinez", address: "741 Cypress Ln, FL", date: "2025-09-14", type: "Accessories", status: "On Hold" },
    { id: 15, name: "Oscar Perez", address: "852 Dogwood Ct, WA", date: "2025-09-15", type: "Health & Medicine", status: "In Transit" },
    { id: 16, name: "Paula Rogers", address: "963 Magnolia Blvd, IL", date: "2025-09-16", type: "Book & Stationary", status: "Completed" },
    { id: 17, name: "Quentin Lee", address: "159 Sycamore Rd, CO", date: "2025-09-17", type: "Fashion & Beauty", status: "Processing" },
    { id: 18, name: "Rachel Hall", address: "753 Oak St, NV", date: "2025-09-18", type: "Home & Living", status: "Rejected" },
    { id: 19, name: "Sam Young", address: "852 Pine Ave, OH", date: "2025-09-19", type: "Electronics", status: "On Hold" },
    { id: 20, name: "Tina Walker", address: "963 Maple Rd, MI", date: "2025-09-20", type: "Mobile & Phone", status: "In Transit" },
    { id: 21, name: "Uma Collins", address: "147 Birch St, NY", date: "2025-09-21", type: "Accessories", status: "Completed" },
    { id: 22, name: "Victor Sanchez", address: "258 Cedar Blvd, LA", date: "2025-09-22", type: "Health & Medicine", status: "Processing" },
    { id: 23, name: "Wendy Brooks", address: "369 Spruce Ln, TX", date: "2025-09-23", type: "Book & Stationary", status: "Rejected" },
    { id: 24, name: "Xavier Price", address: "741 Elm Rd, FL", date: "2025-09-24", type: "Fashion & Beauty", status: "On Hold" },
    { id: 25, name: "Yara Kelly", address: "852 Willow St, WA", date: "2025-09-25", type: "Home & Living", status: "In Transit" },
    { id: 26, name: "Zane Rivera", address: "963 Aspen Blvd, IL", date: "2025-09-26", type: "Electronics", status: "Completed" },
    { id: 27, name: "Amy Cox", address: "147 Cherry Ln, CO", date: "2025-09-27", type: "Mobile & Phone", status: "Processing" },
    { id: 28, name: "Brian Ward", address: "258 Poplar Rd, NV", date: "2025-09-28", type: "Accessories", status: "Rejected" },
    { id: 29, name: "Cathy Brooks", address: "369 Fir St, OH", date: "2025-09-29", type: "Health & Medicine", status: "On Hold" },
    { id: 30, name: "David Ross", address: "741 Palm Blvd, MI", date: "2025-09-30", type: "Book & Stationary", status: "In Transit" },
];



const Orders = () => {
    const typeFilters = ['Health & Medicine', 'Book & Stationary', 'Services & Industry', 'Fashion & Beauty', 'Home & Living', 'Electronics', 'Mobile & Phone', 'Accessories']
    const statusFilters = ['Completed', 'Processing', 'Rejected', 'On Hold', 'In Transit']

    const [selectedTypeFiltres, setSelectedTypeFilteres] = useState<string[]>([])
    const [selectedStatusFilters, setSelectedStatusFilters] = useState<string[]>([])

    const [chosenDates, setChosenDates] = useState<Date[]>([])

    const handleTypeFilterSelect = useCallback((filter: string) => {
        setSelectedTypeFilteres((prev: string[]) => {
            if (prev.includes(filter)) {
                return prev.filter((f: string) => f !== filter)
            }
            return [...prev, filter]

        })
    }, [])

    const handleStatusFilterSelect = useCallback((filter: string) => {
        setSelectedStatusFilters((prev: string[]) => {
            if (prev.includes(filter)) {
                return prev.filter((f: string) => f !== filter)
            }
            return [...prev, filter]

        })
    }, [])

    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Orders</h1>
            <div className="mt-7">
                <FilterBar breakPoint='md'>
                    <FilterBar.Filter >
                        <FilterBar.Button label="Type" />
                        <FilterBar.Popover title="Select a type" description="*you can choose multible types" buttonClick={() => null} buttonLabel="Apply Now">
                            {typeFilters.map((filter: string, index: number) => {
                                return <FilterBar.Option key={index} selected={selectedTypeFiltres.includes(filter)} label={filter} onClick={() => handleTypeFilterSelect(filter)} />

                            })}

                        </FilterBar.Popover>
                    </FilterBar.Filter>

                    <FilterBar.Filter >
                        <FilterBar.Button label="Status" />
                        <FilterBar.Popover title="Select Status" description="*you can choose multible status" buttonClick={() => null} buttonLabel="Apply Now">
                            {statusFilters.map((filter: string, index: number) => {
                                return <FilterBar.Option key={index} selected={selectedStatusFilters.includes(filter)} label={filter} onClick={() => handleStatusFilterSelect(filter)} />

                            })}

                        </FilterBar.Popover>
                    </FilterBar.Filter>

                    <FilterBar.DateFilter>
                        <FilterBar.DateButton />
                        <FilterBar.DatePopover description="*you can choose multible status" buttonClick={() => null} buttonLabel="Apply Now" chosenDates={chosenDates} setChosenDates={setChosenDates} />
                    </FilterBar.DateFilter>
                </FilterBar>
                <div className="mt-7">
                    <Table>
                        <Table.Head>
                            <Table.HeadRow>
                                <Table.HeadCell>
                                    ID
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    NAME
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    ADDRESS
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    DATE
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    TYPE
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
                            {orders.map((order: Order) => {
                                return (
                                    <Table.Row>
                                        <Table.Cell>
                                            {order.id}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.name}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.address}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.date}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.type}
                                        </Table.Cell>
                                        <Table.Cell centered>
                                            <Table.Status
                                                color={order.status === "Completed" ? "green"
                                                    : order.status === "Rejected" ? "red"
                                                        : order.status === "On Hold" ? "yellow"
                                                            : "blue"
                                                }
                                            >
                                                {order.status}
                                            </Table.Status>
                                        </Table.Cell>
                                        <Table.Cell centered>
                                            <ActionButtons>
                                                <ActionButtons.Button type="icon" Icon={Eye} />
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

        </div>
    )
}

export default Orders