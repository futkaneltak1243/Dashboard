import { useCallback, useState, type ChangeEvent } from "react"
import { Searchbar } from "../../components/Searchbar"
import type { PartnerFilter } from "../../types/partners"
import useFilters from "../../hooks/useFilters/useFilters"


const Search = () => {

    const { get, setFilters } = useFilters<PartnerFilter>()
    const initialName = get("name", "string")
    const [name, setName] = useState<string>(initialName ? initialName : "")

    const handleSearchInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])
    return (
        <Searchbar
            color="default"
            size="sm"
            placeholder="Search Partner..."
            onChange={handleSearchInputChange}
            buttonClick={() => setFilters({ name: name })}
            value={name}
        />
    )
}

export default Search