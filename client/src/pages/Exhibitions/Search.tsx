import { useCallback, useEffect, useState, type ChangeEvent } from "react"
import { Searchbar } from "../../components/Searchbar"
import useFilters from "../../hooks/useFilters/useFilters"
import type { ExhibitionFilters } from "../../types/exhibitions"
import { useDebounce } from "../../hooks/useDebounce"


const Search = () => {

    const { get, setFilters } = useFilters<ExhibitionFilters>()
    const initialTitle = get("title", "string")
    const [title, setTitle] = useState<string>(initialTitle ? initialTitle : "")
    const debouncedTitle = useDebounce(title)

    const handleSearchInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }, [])

    useEffect(() => {
        setFilters({ title: debouncedTitle })
    }, [debouncedTitle])

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