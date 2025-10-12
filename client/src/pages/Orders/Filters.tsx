import { useCallback, useState } from "react"
import { FilterBar } from "../../components/Filter"
import useFilters from "../../hooks/useFilters/useFilters"
import type { OrderFilters, Status } from "../../types/orders"
import { format } from "date-fns"


const statusFilters: Status[] = ['Completed', 'Processing', 'Rejected', 'On Hold', 'In Transit']

function isArrayOfStrings(variable: any) {
    return Array.isArray(variable) && variable.every(item => typeof item === 'string');
}

const Filters = () => {
    const { get, setFilters } = useFilters<OrderFilters>()
    const status = get("status", "array")
    const date = get("date", "array")

    const [selectedStatusFilters, setSelectedStatusFilters] = useState<Status[]>(status ? status : [])
    const [chosenDates, setChosenDates] = useState<Date[]>(isArrayOfStrings(date) ? date.map((d) => new Date(d)) : [])

    const handleResetFilters = useCallback(() => {
        setFilters({ page: 1, status: [], date: [] })
        setSelectedStatusFilters([])
        setChosenDates([])
    }, [setFilters])

    const handleStatusFilterSelect = useCallback((filter: Status) => {
        setSelectedStatusFilters((prev: Status[]) => {
            if (prev.includes(filter)) {
                return prev.filter((f: Status) => f !== filter)
            }
            return [...prev, filter]

        })
    }, [])

    return (
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
    )
}

export default Filters