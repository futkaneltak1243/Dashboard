import { Button } from "../../components/Button"
import type { Exhibition } from "../../types/exhibitions"

import useFetch from "../../hooks/useFetch/useFetch"
import { useLocation } from "react-router-dom"
import { Pagination } from "../../components/advaned"
import Search from "./Search"
import { useCallback, useState } from "react"
import ExhibitionTable from "./ExhibitionsTable"



interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Exhibition[];
}

const Exhibitions = () => {
    const location = useLocation()
    const { data, error, loading, refetch } = useFetch<Data>(location.pathname + location.search)

    const [formData, setFormData] = useState<Omit<Exhibition, "id">>({
        name: "",
        title: "",
        location: "",
        organizer: "",
        dates: "",
        status: "Planned",
        capacity: 0,

    })



    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetFormData = useCallback(() => {
        setFormData({
            name: "",
            title: "",
            location: "",
            organizer: "",
            dates: "",
            status: "Planned",
            capacity: 0,
        });
    }, [setFormData])




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


    const exhibitions = data.data
    return (
        <div className="p-[15px] md:p-[30px] w-full overflow-x-scroll">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Exhibitions</h1>
            <div className="flex justify-end mt-4">
                <Button>Add Exhibition</Button>
            </div>
            <div className="mt-4 flex justify-start">
                <Search />
            </div>
            <div className="mt-4">

                <ExhibitionTable
                    exhibitions={exhibitions}
                    formData={formData}
                    setFormData={setFormData}
                    refetch={refetch}
                    handleFormDataChange={handleFormDataChange}
                    resetFormData={resetFormData}
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

export default Exhibitions