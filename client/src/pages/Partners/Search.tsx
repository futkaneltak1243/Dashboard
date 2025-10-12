import { useCallback, useEffect, useState, type ChangeEvent } from "react"
import { Searchbar } from "../../components/Searchbar"
import type { PartnerFilter } from "../../types/partners"
import useFilters from "../../hooks/useFilters/useFilters"
import { useDebounce } from "../../hooks/useDebounce"


const Search = () => {

    const { get, setFilters } = useFilters<PartnerFilter>()
    const initialName = get("name", "string")
    const [name, setName] = useState<string>(initialName ? initialName : "")

    const debouncedName = useDebounce(name)

    const handleSearchInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    useEffect(() => {
        setFilters({ name: debouncedName })
    }, [debouncedName])


    return (
        <Searchbar
            color="default"
            size="sm"
            placeholder="Search Partner..."
            onChange={handleSearchInputChange}
            value={name}
        />
    )
}

export default Search