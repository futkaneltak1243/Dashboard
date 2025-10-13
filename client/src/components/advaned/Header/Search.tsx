import { useState } from "react";
import { Searchbar } from "../../Searchbar"
import { useDebounce } from "../../../hooks/useDebounce";
import useFetch from "../../../hooks/useFetch/useFetch";
import { Link } from "react-router-dom";

type SearchItem = {
    location: string;
    key: string;
    link: string;
}

type Data = SearchItem[]

const Search = () => {

    const [key, setKey] = useState("")
    const debouncedKey = useDebounce(key)
    const { data } = useFetch<Data>(debouncedKey ? `/search?key=${debouncedKey}` : null);

    const searchData = key ? data || [] : [];

    return (
        <div className="w-full relative">
            <Searchbar size="md" value={key} onChange={(e) => setKey(e.target.value)} />
            {searchData.length > 0 && (
                <div className="absolute top-10 left-0 w-full max-w-[393px] bg-items-light dark:bg-items-dark rounded-lg border border-lightgray shadow-lg overflow-hidden divide-y-[1px] divide-lightgray z-50">
                    {searchData.map((item: SearchItem, index: number) => (
                        <Link
                            key={index}
                            to={item.link}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <p className="text-sm font-medium text-gray-800 dark:text-white">{item.location}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400"># {item.key}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Search