import { ChevronLeft, ChevronRight, SquarePen, Trash2 } from "lucide-react";
import { ActionButtons } from "../components/ActionButtons";
import { Button } from "../components/Button"
import { Searchbar } from "../components/Searchbar"
import { Table } from "../components/Table"
import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch/useFetch";
import type { Partner, PartnerFilter } from "../types/partners"
import useFilters from "../hooks/useFilters/useFilters";
import { useCallback, useState, type ChangeEvent } from "react";



interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Partner[];
}

const Partners = () => {


    const location = useLocation()
    const { data, error, loading } = useFetch<Data>(location.pathname + location.search)
    const { get, setFilters } = useFilters<PartnerFilter>()
    const initialName = get("name", "string")
    const page = get("page", "number")
    const [name, setName] = useState<string>(initialName ? initialName : "")

    const handleSearchInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

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

    const partners = data.data
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Partners</h1>
            <div className="flex justify-end mt-4">
                <Button>Add Partner</Button>
            </div>
            <div className="mt-4 flex justify-start">
                <Searchbar
                    color="default"
                    size="sm"
                    placeholder="Search Partner..."
                    onChange={handleSearchInputChange}
                    buttonClick={() => setFilters({ name: name })}
                    value={name}
                />
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
                                            <ActionButtons.Button Icon={SquarePen} type="icon" />
                                            <ActionButtons.Button Icon={Trash2} type="icon" iconClass="text-red-600 dark:text-red-400" />
                                        </ActionButtons>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}

                    </Table.Body>
                </Table>
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
                            disabled={page === data.totalPages}
                        />
                    </ActionButtons>
                </div>

            </div>
        </div>
    )
}

export default Partners