import { useLocation } from "react-router-dom";
import { Button } from "../../components/Button"
import { Products as Ps } from "../../components/Products"
import useFetch from "../../hooks/useFetch/useFetch";
import type { Product } from "../../types/product";
import { useCallback, useEffect, useState } from "react";

import { FormDialog } from "../../components/FormDialog";
import { Pagination } from "../../components/advaned";
import Search from "./Search";
import { handleSubmit } from "../../utils/handleSubmit";
import toast from "react-hot-toast";
import { uploadImages } from "../../utils/uploadImages";





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

    const [files, setFiles] = useState<File[]>([]);
    const [serverImages, setServerImages] = useState<string[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const [createFormOpen, setCreateFormOpen] = useState(false);

    const [editFormOpen, setEditFormOpen] = useState(false)

    const [isCeateFormSubmitting, setIsCeateFormSubmitting] = useState(false)
    const [isEditFormSubmitting, setIsEditFormSubmitting] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        price: 0
    })

    const handleEditClick = useCallback((product: Product) => {
        setSelectedProduct(product)
        setFormData({
            name: product.name,
            price: product.price,
        })
        setServerImages(product.images)
        setEditFormOpen(true)
    }, [])

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetFormData = useCallback(() => {
        setFormData({
            name: "",
            price: 0,
        })
        setServerImages([])
        setFiles([])
    }, [])

    useEffect(() => {

        resetFormData()

    }, [createFormOpen]);

    const handleCreateFormSubmit = async () => {
        setIsCeateFormSubmitting(true)
        try {
            const imageUrls = files.length ? await uploadImages(files) : undefined
            handleSubmit({
                url: "/products",
                method: "POST",
                data: { ...formData, images: imageUrls },
                onSuccess: () => {
                    resetFormData();
                    toast.success("product added successfully");
                    setCreateFormOpen(false)
                    refetch()
                },
                onError: (err) => { toast.error(err) },
            })
        } catch (error: any) {
            toast.error(error?.message || "failed uploading images")
        } finally {
            setIsCeateFormSubmitting(false)
        }
    }

    const handleEditFormSubmit = async () => {

        if (!selectedProduct) return;
        setIsEditFormSubmitting(true)
        try {
            console.log(files)
            const imageUrls = files.length ? await uploadImages(files) : []
            handleSubmit({
                url: `/products/${selectedProduct.id}`,
                method: "PUT",
                data: { ...formData, images: [...serverImages, ...imageUrls] },
                onSuccess: () => {
                    toast.success("product updated successfully");
                    setEditFormOpen(false);
                    resetFormData();
                    setSelectedProduct(null);
                    refetch();
                },
                onError: (err) => toast.error(err),
            });
        } catch (error: any) {
            toast.error(error?.message || "failed uploading images")
        } finally {
            setIsEditFormSubmitting(false)
        }
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

    const products = data.data



    return (
        <>
            <FormDialog open={editFormOpen} setOpen={setEditFormOpen}>
                <FormDialog.Body
                    buttonLabel="Update"
                    onSubmit={handleEditFormSubmit}
                    loading={isEditFormSubmitting}
                >
                    <FormDialog.TextInput
                        label="Name"
                        name="name"
                        value={formData['name']}
                        onChange={handleFormDataChange}
                    />
                    <FormDialog.TextInput
                        label="Price"
                        name="price"
                        type="number"
                        value={String(formData['price'])}
                        onChange={handleFormDataChange}
                    />
                    <FormDialog.ImageInput
                        label="Images"
                        serverImages={serverImages}
                        setServerImages={setServerImages}
                        files={files}
                        setFiles={setFiles}

                    />
                </FormDialog.Body>
            </FormDialog>
            <div className="p-[15px] md:p-[30px]">

                <h1 className="text-text-light dark:text-text-dark text-3xl">Products</h1>
                <div className="flex justify-end mt-4">
                    <FormDialog open={createFormOpen} setOpen={setCreateFormOpen}>
                        <FormDialog.Trigger>
                            <Button>Add Product</Button>
                        </FormDialog.Trigger>
                        <FormDialog.Body
                            buttonLabel="Save"
                            onSubmit={handleCreateFormSubmit}
                            loading={isCeateFormSubmitting}
                        >
                            <FormDialog.TextInput
                                label="Name"
                                name="name"
                                value={formData['name']}
                                onChange={handleFormDataChange}
                            />
                            <FormDialog.TextInput
                                label="Price"
                                name="price"
                                type="number"
                                value={String(formData['price'])}
                                onChange={handleFormDataChange}
                            />
                            <FormDialog.ImageInput
                                label="Images"
                                serverImages={[]}
                                setServerImages={() => []}
                                files={files}
                                setFiles={setFiles}

                            />
                        </FormDialog.Body>
                    </FormDialog>
                </div>
                <div className="mt-7">
                    <Search />
                </div>
                <div className="mt-4">
                    <Ps>
                        {products?.map((product: Product) => {
                            return <Ps.Product
                                key={product.id}
                                images={product.images}
                                title={product.name} price={product.price}
                                isFavorites={product.isfavorite}
                                buttonClick={() => handleEditClick(product)}
                            />
                        })}
                    </Ps>

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