import { useLocation } from "react-router-dom";
import { Products as Ps } from "../components/Products"
import { Searchbar } from "../components/Searchbar";
import type { Product, ProductFilters } from "../types/product";
import useFilters from "../hooks/useFilters/useFilters";
import useFetch from "../hooks/useFetch/useFetch";
import { useCallback, useState, type ChangeEvent } from "react";
import { ActionButtons } from "../components/ActionButtons";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Product[];
}

const Favorites = () => {
    const location = useLocation()

    const { setFilters, get } = useFilters<ProductFilters>()
    const page = get("page", "number")
    const initialName = get("name", "string")

    const searchParams = new URLSearchParams(location.search)
    searchParams.set("isfavorite", "1")
    const queryString = searchParams.toString()
    const apiUrl = `/products?${queryString}`
    const { data, loading, error } = useFetch<Data>(apiUrl)

    console.log(data)
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

    const products = data.data

    const handlePageChange = (p: number) => {
        if (p < 1) return
        if (p > data?.totalPages) return
        setFilters({ page: p })
    }
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Favorites</h1>

            <div className="mt-7 w-full flex justify-end">
                <Searchbar
                    color="default"
                    size="sm"
                    placeholder="Search Product..."
                    buttonClick={() => setFilters({ name: name })}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e)}
                    value={name}
                />            </div>
            <div className="mt-4">
                <Ps>
                    {products.map((product: Product) => {
                        return <Ps.Product key={product.id} images={JSON.parse(product.images)} title={product.name} price={product.price} isFavorites={product.isfavorite} />
                    })}
                </Ps>


            </div>
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
                        disabled={page === data.totalPages || data.total === 0}
                    />
                </ActionButtons>
            </div>

        </div>
    )
}


export default Favorites