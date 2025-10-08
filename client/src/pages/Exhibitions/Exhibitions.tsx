import { ActionButtons } from "../../components/ActionButtons"
import { Button } from "../../components/Button"

import { Table } from "../../components/Table"
import { MapPin, SquarePen, Trash2 } from "lucide-react"
import type { Exhibition } from "../../types/exhibitions"

import useFetch from "../../hooks/useFetch/useFetch"
import { useLocation } from "react-router-dom"
import { Pagination } from "../../components/advaned"
import Search from "./Search"



interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Exhibition[];
}

const Exhibitions = () => {
    const location = useLocation()
    const { data, error, loading } = useFetch<Data>(location.pathname + location.search)


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


    const exhibitions = data.data
    return (
        <div className="p-[15px] md:p-[30px] w-full overflow-x-scroll">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Exhibitions</h1>
            <div className="flex justify-end mt-4">
                <Button>Add Exhibition</Button>
            </div>
            <div className="mt-4 flex justify-start">
                <Search />
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
                                            <ActionButtons.Button Icon={SquarePen} type="icon" />
                                            <ActionButtons.Button Icon={Trash2} type="icon" iconClass="text-red-600 dark:text-red-400" />
                                        </ActionButtons>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}

                    </Table.Body>
                </Table>
            </div>

            <Pagination
                limit={data.limit}
                total={data.total}
                totalPages={data.totalPages}
                currentPage={data.page}
            />

        </div>

    )
}

export default Exhibitions