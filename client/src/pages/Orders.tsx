import { useCallback, useState } from "react";
import { FilterBar } from "../components/Filter";
import { Table } from "../components/Table";
import { ActionButtons } from "../components/ActionButtons";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch/useFetch";
import useFilters from "../hooks/useFilters/useFilters";
import type { Order, OrderFilters, Status } from "../types/orders";
import { format } from 'date-fns'




interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Order[];
}


function isArrayOfStrings(variable: any) {
    return Array.isArray(variable) && variable.every(item => typeof item === 'string');
}


const Orders = () => {
    const location = useLocation()
    const { data, error, loading } = useFetch<Data>(location.pathname + location.search)
    const { get, setFilters } = useFilters<OrderFilters>()
    const page = get("page", "number")
    const status = get("status", "array")
    const date = get("date", "array")
    const statusFilters: Status[] = ['Completed', 'Processing', 'Rejected', 'On Hold', 'In Transit']
    const [selectedStatusFilters, setSelectedStatusFilters] = useState<Status[]>(status ? status : [])
    const [chosenDates, setChosenDates] = useState<Date[]>(isArrayOfStrings(date) ? date.map((d) => new Date(d)) : [])

    const handleStatusFilterSelect = useCallback((filter: Status) => {
        setSelectedStatusFilters((prev: Status[]) => {
            if (prev.includes(filter)) {
                return prev.filter((f: Status) => f !== filter)
            }
            return [...prev, filter]

        })
    }, [])

    const handleResetFilters = useCallback(() => {
        setFilters({ page: 1, status: [], date: [] })
        setSelectedStatusFilters([])
        setChosenDates([])
    }, [setFilters])



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-red-600 text-2xl mb-2">Oops! Something went wrong.</p>
                <p className="text-gray-600">{error}</p>
            </div>
        );
    }

    if (!data) return null;

    const handlePageChange = (p: number) => {
        if (p < 1) return
        if (p > data?.totalPages) return
        setFilters({ page: p })
    }

    const orders = data.data





    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Orders</h1>
            <div className="mt-7">
                <FilterBar
                    breakPoint='md'
                    resetButtonClick={handleResetFilters}
                >

                    <FilterBar.Filter >
                        <FilterBar.Button label="Status" />
                        <FilterBar.Popover
                            title="Select Status"
                            description="*you can choose multible status"
                            buttonClick={() => setFilters({ status: selectedStatusFilters })}
                            buttonLabel="Apply Now"
                        >
                            {statusFilters.map((filter: Status) => {
                                return <FilterBar.Option key={filter} selected={selectedStatusFilters.includes(filter)} label={filter} onClick={() => handleStatusFilterSelect(filter)} />

                            })}

                        </FilterBar.Popover>
                    </FilterBar.Filter>

                    <FilterBar.DateFilter>
                        <FilterBar.DateButton />
                        <FilterBar.DatePopover
                            description="*you can choose multible status"
                            buttonClick={() => setFilters({ date: chosenDates.map((d) => format(d, 'yyyy-MM-dd')) })}
                            buttonLabel="Apply Now"
                            chosenDates={chosenDates}
                            setChosenDates={setChosenDates}
                        />
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
                                    <Table.Row key={order.id}>
                                        <Table.Cell>
                                            {order.id}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.user_fullname}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.address}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {order.date}
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
                <div className="flex justify-between mt-[20px]">
                    <p className="text-sm text-midgray">
                        showing {data.total ? 1 + data.limit * (data.page - 1) : 0}-{Math.min(data.limit * data.page, data.total)} of {data.total}
                    </p>
                    <ActionButtons>
                        <ActionButtons.Button
                            type="icon"
                            Icon={ChevronLeft}
                            onClick={() => handlePageChange(page ? page - 1 : 1)}
                            disabled={page === 1}
                        />
                        <ActionButtons.Button
                            type="icon"
                            Icon={ChevronRight}
                            onClick={() =>
                                handlePageChange(page ? page + 1 : 1)}
                            disabled={page === data.totalPages || data.total === 0}
                        />
                    </ActionButtons>
                </div>
            </div>

        </div>
    )
}

export default Orders