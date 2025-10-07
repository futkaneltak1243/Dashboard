
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch/useFetch";
import type { Partner } from "../../types/partners"
import { useState } from "react";
import PartnersTable from "./PartnersTable";
import CreateButton from "./CreateButton";
import { Pagination } from "../../components/advaned";
import Search from "./Search";



interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Partner[];
}

const Partners = () => {


    const location = useLocation()
    const { data, error, loading, refetch } = useFetch<Data>(location.pathname + location.search)

    const [formData, setFormData] = useState<Omit<Partner, "id">>({
        name: "",
        company: "",
        email: "",
        type: "Investor",
        joined: "",

    })

    const resetFormData = () => {
        setFormData({
            name: "",
            company: "",
            email: "",
            type: "Investor",
            joined: "",
        });
    }

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


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


    const partners = data.data
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Partners</h1>
            <div className="flex justify-end mt-4">
                <CreateButton
                    formData={formData}
                    handleFormDataChange={handleFormDataChange}
                    resetFormData={resetFormData}
                    refetch={refetch}
                />
            </div>
            <div className="mt-4 flex justify-start">
                <Search />
            </div>
            <div className="mt-4">
                <PartnersTable
                    partners={partners}
                    formData={formData}
                    setFormData={setFormData}
                    refetch={refetch}
                    handleFormDataChange={handleFormDataChange}
                />
                <Pagination
                    total={data.total}
                    currentPage={data.page}
                    totalPages={data.totalPages}
                    limit={data.limit}

                />

            </div>
        </div>
    )
}

export default Partners