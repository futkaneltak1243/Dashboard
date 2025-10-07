
import useFetch from "../../hooks/useFetch/useFetch"
import type { User } from "../../types/user"
import { useLocation } from "react-router-dom"
import UsersTable from "./UsersTable"
import CreateButton from "./CreateButton"
import FiltersAndSearch from "./FiltersAndSearch"
import { Pagination } from "../../components/advaned"
import { useState } from "react"


interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: User[];
}


const Users = () => {

    const [formData, setFormData] = useState<Omit<User, "id" | "avatar">>({
        fullname: "",
        username: "",
        email: "",
        role: "Admin",
        status: "active",
        password: "",

    })

    const location = useLocation()
    const { data, loading, error, refetch } = useFetch<Data>(location.pathname + location.search)
    const resetFormData = () => {
        setFormData({
            fullname: "",
            username: "",
            email: "",
            role: "Admin",
            status: "active",
            password: ""
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

    const users = data?.data
    if (!users) return
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Users</h1>
            <div className="flex justify-end mt-4">

                <CreateButton
                    formData={formData}
                    handleFormDataChange={handleFormDataChange}
                    resetFormData={resetFormData}
                    refetch={refetch}
                />
            </div>

            <FiltersAndSearch />
            <div className="mt-4">
                <UsersTable
                    users={users}
                    formData={formData}
                    setFormData={setFormData}
                    refetch={refetch}
                    handleFormDataChange={handleFormDataChange}
                />
                <Pagination
                    limit={data.limit}
                    total={data.total}
                    totalPages={data.totalPages}
                    currentPage={data.page}
                />

            </div>

        </div>
    )
}

export default Users