import { useLocation } from "react-router-dom";
import type { Product } from "../../types/product";
import useFetch from "../../hooks/useFetch/useFetch";
import ProductsGrid from "../Products/ProductsGrid";
import { Pagination } from "../../components/advaned";
import Search from "./Search";


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



    const searchParams = new URLSearchParams(location.search)
    searchParams.set("isfavorite", "1")
    const queryString = searchParams.toString()
    const apiUrl = `/products?${queryString}`
    const { data, loading, error, refetch } = useFetch<Data>(apiUrl)




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

    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Favorites</h1>

            <div className="mt-7 w-full flex justify-end">
                <Search />
            </div>
            <div className="mt-4">
                <ProductsGrid
                    products={products}
                    refetch={refetch}
                />

            </div>
            <Pagination
                limit={data.limit}
                total={data.total}
                totalPages={data.totalPages}
                currentPage={data.page}
            />

        </div>
    )
}


export default Favorites