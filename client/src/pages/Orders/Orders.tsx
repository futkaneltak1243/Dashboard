import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch/useFetch";
import type { Order } from "../../types/orders";
import { Pagination } from "../../components/advaned";
import Filters from "./Filters";
import OrdersTable from "./OrdersTable";


interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Order[];
}


const Orders = () => {
    const location = useLocation()
    const { data, error, loading } = useFetch<Data>(location.pathname + location.search)


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
    const orders = data.data

    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Orders</h1>
            <div className="mt-7">
                <Filters />
                <div className="mt-7">
                    <OrdersTable
                        orders={orders}
                    />
                </div>
                <Pagination
                    limit={data.limit}
                    currentPage={data.page}
                    totalPages={data.totalPages}
                    total={data.total}
                />
            </div>

        </div>
    )
}

export default Orders