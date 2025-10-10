import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch/useFetch";
import type { Product } from "../../types/product";
import { Pagination } from "../../components/advaned";
import Search from "./Search";
import ProductsGrid from "./ProductsGrid";
import CreateButton from "./CreateButton";





interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Product[];
}

const Products = () => {


    const location = useLocation()
    const { data, loading, error, refetch } = useFetch<Data>(location.pathname + location.search)


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
        <>
            <div className="p-[15px] md:p-[30px]">

                <h1 className="text-text-light dark:text-text-dark text-3xl">Products</h1>
                <div className="flex justify-end mt-4">
                    <CreateButton
                        refetch={refetch}
                    />
                </div>
                <div className="mt-7">
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
                    totalPages={data.totalPages}
                    currentPage={data.page}
                    total={data.total}
                />

            </div>
        </>
    )
}

export default Products