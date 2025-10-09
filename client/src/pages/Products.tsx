import { useLocation } from "react-router-dom";
import { Button } from "../components/Button"
import { Products as Ps } from "../components/Products"
import { Searchbar } from "../components/Searchbar";
import useFetch from "../hooks/useFetch/useFetch";
import type { ProductFilters, Product } from "../types/product";
import { useCallback, useState, type ChangeEvent } from "react";
import { ActionButtons } from "../components/ActionButtons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFilters from "../hooks/useFilters/useFilters";
import { FormDialog } from "../components/FormDialog";





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
    const { setFilters, get } = useFilters<ProductFilters>()
    const initialName = get("name", "string")
    const page = get("page", "number")
    const { data, loading, error } = useFetch<Data>(location.pathname + location.search)
    const [name, setName] = useState<string>(initialName ? initialName : "")

    const [files, setFiles] = useState<File[]>([]);


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

            <h1 className="text-text-light dark:text-text-dark text-3xl">Products</h1>
            <div className="flex justify-end mt-4">
                <FormDialog>
                    <FormDialog.Trigger>
                        <Button>Add Product</Button>
                    </FormDialog.Trigger>
                    <FormDialog.Body buttonLabel="Save">
                        <FormDialog.ImageInput
                            serverImages={[]}
                            setServerImages={() => null}
                            files={files}
                            setFiles={setFiles}
                            label="Images"
                        />
                    </FormDialog.Body>
                </FormDialog>
            </div>
            <div className="mt-7">
                <Searchbar
                    color="default"
                    size="sm"
                    placeholder="Search Product..."
                    buttonClick={() => setFilters({ name: name })}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e)}
                    value={name}
                />
            </div>
            <div className="mt-4">
                <Ps>
                    {products?.map((product: Product) => {
                        return <Ps.Product
                            key={product.id}
                            images={product.images}
                            title={product.name} price={product.price}
                            isFavorites={product.isfavorite}
                        />
                    })}
                </Ps>

            </div>
            <div className="flex justify-between mt-[20px]">
                <p className="text-sm text-midgray">
                    showing {1 + data.limit * (data.page - 1)}-{Math.min(data.limit * data.page, data.total)} of {data.total}
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
                        disabled={page === data.totalPages}
                    />
                </ActionButtons>
            </div>

        </div>
    )
}

export default Products