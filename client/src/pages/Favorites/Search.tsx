import { useCallback, useState, type ChangeEvent } from "react"
import { Searchbar } from "../../components/Searchbar"
import useFilters from "../../hooks/useFilters/useFilters"
import type { ProductFilters } from "../../types/product"


const Search = () => {

    const { setFilters, get } = useFilters<ProductFilters>()
    const initialName = get("name", "string")

    const [name, setName] = useState<string>(initialName ? initialName : "")


    const handleSearchInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    return (
        <Searchbar
            color="default"
            size="sm"
            placeholder="Search Product..."
            buttonClick={() => setFilters({ name: name })}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e)}
            value={name}
        />
    )
}

export default Search