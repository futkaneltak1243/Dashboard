import { useCallback, useState, type ChangeEvent, memo } from "react"
import { FilterBar } from "../../components/Filter"
import { Searchbar } from "../../components/Searchbar"
import type { UserFilters, UserRole, UserStatus } from "../../types/user"
import useFilters from "../../hooks/useFilters/useFilters"


const roleFilters: UserRole[] = ['Super Admin', 'Admin', 'Manager', 'Seller', 'Delivery Agent', 'Customer']
const statusFilters: UserStatus[] = ['active', 'inactive', 'pending']




const FiltersAndSearch = () => {

    const { setFilters, get } = useFilters<UserFilters>()
    const status = get("status", "array")
    const role = get("role", "array")
    const initialName = get("name", "string")

    const [selectedRoleFiltres, setSelectedRoleFilteres] = useState<UserRole[]>(role ? role : [])
    const [selectedStatusFilters, setSelectedStatusFilters] = useState<UserStatus[]>(status ? status : [])
    const [name, setName] = useState<string>(initialName ? initialName : "")



    const handleResetFilters = useCallback(() => {
        setFilters({ page: 1, status: [], role: [], name: "" })
        setName("")
        setSelectedRoleFilteres([])
        setSelectedStatusFilters([])
    }, [setFilters])


    const handleRoleFilterSelect = useCallback((filter: UserRole) => {
        setSelectedRoleFilteres((prev: UserRole[]) => {
            if (prev.includes(filter)) {
                return prev.filter((f: UserRole) => f !== filter)
            }
            return [...prev, filter]

        })
    }, [])

    const handleStatusFilterSelect = useCallback((filter: UserStatus) => {
        setSelectedStatusFilters((prev: UserStatus[]) => {
            if (prev.includes(filter)) {
                return prev.filter((f: UserStatus) => f !== filter)
            }
            return [...prev, filter]

        })
    }, [])

    const handleSearchInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    return (
        <>
            <div className="mt-7">
                <FilterBar
                    breakPoint='md'
                    resetButtonClick={handleResetFilters}
                >
                    <FilterBar.Filter >
                        <FilterBar.Button label="Role" />
                        <FilterBar.Popover title="Select a role" description="*you can choose multible roles" buttonClick={() => setFilters({ role: selectedRoleFiltres })} buttonLabel="Apply Now">
                            {roleFilters.map((filter: UserRole, index: number) => {
                                return <FilterBar.Option key={index} selected={selectedRoleFiltres.includes(filter)} label={filter} onClick={() => handleRoleFilterSelect(filter)} />

                            })}

                        </FilterBar.Popover>
                    </FilterBar.Filter>

                    <FilterBar.Filter >
                        <FilterBar.Button label="Status" />
                        <FilterBar.Popover title="Select Status" description="*you can choose multible status" buttonClick={() => setFilters({ status: selectedStatusFilters })} buttonLabel="Apply Now">
                            {statusFilters.map((filter: UserStatus, index: number) => {
                                return <FilterBar.Option key={index} selected={selectedStatusFilters.includes(filter)} label={filter} onClick={() => handleStatusFilterSelect(filter)} />

                            })}

                        </FilterBar.Popover>
                    </FilterBar.Filter>
                </FilterBar>
            </div>
            <div className="mt-4 flex justify-end">
                <Searchbar
                    color="default"
                    size="sm"
                    placeholder="Search Users..."
                    buttonClick={() => setFilters({ name: name })}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e)}
                    value={name}
                />
            </div>
        </>
    )
}

export default memo(FiltersAndSearch)