import { useCallback, useState, type FC, } from "react"
import { Products } from "../../components/Products"
import type { Product } from "../../types/product"
import EditForm from "./EditForm";
import Confirmation from "./Confirmation";
import { toggleProductLike } from "../../utils/products";

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

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product)
        setConfirmationOpen(true)
    }

    const handleLikeClick = useCallback((product: Product) => {
        toggleProductLike(
            product.id,
            product.isfavorite === 1 ? 0 : 1,
            refetch
        )
    }, [refetch])

    return (
        <>
            <Confirmation
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
                        deleteClick={() => handleDeleteClick(product)}
                        likeClick={() => handleLikeClick(product)}
                    />
                })}
            </Products>
        </>
    )
}

export default ProductsGrid