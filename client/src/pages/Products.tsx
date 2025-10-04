import { useLocation } from "react-router-dom";
import { Button } from "../components/Button"
import { Products as Ps } from "../components/Products"
import { Searchbar } from "../components/Searchbar";
import useFetch from "../hooks/useFetch/useFetch";




type Product = {
    images: string;
    name: string;
    price: number;
    isfavorites: 1 | 0;
};

interface Data {
    page: number;
    limit: number;
    count: number;
    data: Product[];
}

const Products = () => {

    const location = useLocation()

    const { data } = useFetch<Data>(location.pathname + location.search)

    const products = data?.data

    console.log(data)
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Products</h1>
            <div className="flex justify-end mt-4">
                <Button>Add Product</Button>
            </div>
            <div className="mt-7">
                <Searchbar color="default" size="sm" placeholder="Search Product..." />
            </div>
            <div className="mt-4">
                <Ps>
                    {products?.map((product: Product) => {
                        return <Ps.Product
                            images={JSON.parse(product.images)}
                            title={product.name} price={product.price}
                            isFavorites={product.isfavorites}
                        />
                    })}
                </Ps>

            </div>

        </div>
    )
}

export default Products