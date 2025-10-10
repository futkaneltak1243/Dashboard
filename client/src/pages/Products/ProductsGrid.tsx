import { useCallback, useState, type FC, } from "react"
import { Products } from "../../components/Products"
import type { Product } from "../../types/product"
import EditForm from "./EditForm";
import Confiramtion from "./Confirmation";

interface ProductsGridProps {
    products: Product[]
    refetch: () => void;
}

const ProductsGrid: FC<ProductsGridProps> = ({ products, refetch }) => {

    const [formData, setFormData] = useState({
        name: "",
        price: "",
    })

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [files, setFiles] = useState<File[]>([]);
    const [serverImages, setServerImages] = useState<string[]>([])
    const [editFormOpen, setEditFormOpen] = useState(false)
    const [confirmationOpen, setConfirmationOpen] = useState(false)



    const handleEditClick = useCallback((product: Product) => {
        setSelectedProduct(product)
        setFormData({
            name: product.name,
            price: String(product.price),
        })
        setServerImages(product.images)
        setFiles([])
        setEditFormOpen(true)
    }, [])

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Confiramtion
                selectedProduct={selectedProduct}
                confirmationOpen={confirmationOpen}
                setConfirmationOpen={setConfirmationOpen}
                refetch={refetch}
            />

            <EditForm
                editFormOpen={editFormOpen}
                setEditFormOpen={setEditFormOpen}
                formData={formData}
                handleFormDataChange={handleFormDataChange}
                serverImages={serverImages}
                setServerImages={setServerImages}
                files={files}
                setFiles={setFiles}
                selectedProduct={selectedProduct}
                refetch={refetch}
            />

            <Products>
                {products?.map((product: Product) => {
                    return <Products.Product
                        key={product.id}
                        images={product.images}
                        title={product.name} price={product.price}
                        isFavorites={product.isfavorite}
                        editClick={() => handleEditClick(product)}
                    />
                })}
            </Products>
        </>
    )
}

export default ProductsGrid