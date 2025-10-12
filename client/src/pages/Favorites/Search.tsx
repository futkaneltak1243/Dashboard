import { useCallback, useEffect, useState, type ChangeEvent } from "react"
import { Searchbar } from "../../components/Searchbar"
import useFilters from "../../hooks/useFilters/useFilters"
import type { ProductFilters } from "../../types/product"
import { useDebounce } from "../../hooks/useDebounce"


const Search = () => {

    const { setFilters, get } = useFilters<ProductFilters>()
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
            placeholder="Search Product..."
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e)}
            value={name}
        />
    )
}

export default Search