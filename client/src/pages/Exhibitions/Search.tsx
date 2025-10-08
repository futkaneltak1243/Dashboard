import { useCallback, useState, type ChangeEvent } from "react"
import { Searchbar } from "../../components/Searchbar"
import useFilters from "../../hooks/useFilters/useFilters"
import type { ExhibitionFilters } from "../../types/exhibitions"


const Search = () => {

    const { get, setFilters } = useFilters<ExhibitionFilters>()
    const initialTitle = get("title", "string")
    const [title, setTitle] = useState<string>(initialTitle ? initialTitle : "")


    const handleSearchInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }, [])

    return (
        <Searchbar
            color="default"
            size="sm"
            placeholder="Search Exhibitions..."
            onChange={handleSearchInputChange}
            buttonClick={() => setFilters({ title: title })}
            value={title}
        />
    )
}

export default Search