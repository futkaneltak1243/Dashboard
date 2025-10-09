import { useState, type Dispatch, type FC, type SetStateAction } from "react"
import { Products } from "../../components/Products"
import type { Product } from "../../types/product"

interface ProductsGridProps {
    products: Product[]
    formData: Omit<Product, "id" | "images" | "isfavorite">;
    setFormData: Dispatch<SetStateAction<Omit<Product, "id" | "images" | "isfavorite">>>;
    refetch: () => void;
    handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    resetFormData: () => void;
}

const ProductsGrid: FC<ProductsGridProps> = ({ products, formData, setFormData, refetch, handleFormDataChange, resetFormData }) => {

    const [editFormOpen, setEditFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            price: product.price
        });
        setEditFormOpen(true);
    };
    return (
        <Products>
            {products?.map((product: Product) => {
                return <Products.Product
                    key={product.id}
                    images={product.images}
                    title={product.name} price={product.price}
                    isFavorites={product.isfavorite}
                />
            })}
        </Products>
    )
}

export default ProductsGrid