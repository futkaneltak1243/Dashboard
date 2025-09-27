import { Button } from "../components/Button"
import { Products as Ps } from "../components/Products"
import { Searchbar } from "../components/Searchbar";


const products = [
    {
        images: [
            "https://picsum.photos/300/300?random=1",
            "https://picsum.photos/300/300?random=2"
        ],
        title: "Modern Leather Wallet",
        price: 29.99,
        isFavorites: true
    },
    {
        images: [
            "https://picsum.photos/300/300?random=3",
            "https://picsum.photos/300/300?random=4"
        ],
        title: "Stylish Sunglasses",
        price: 19.99,
        isFavorites: false
    },
    {
        images: [
            "https://picsum.photos/300/300?random=5",
            "https://picsum.photos/300/300?random=6"
        ],
        title: "Wireless Bluetooth Headphones",
        price: 89.99,
        isFavorites: true
    },
    {
        images: [
            "https://picsum.photos/300/300?random=7",
            "https://picsum.photos/300/300?random=8"
        ],
        title: "Smart Fitness Tracker",
        price: 49.99,
        isFavorites: false
    },
    {
        images: [
            "https://picsum.photos/300/300?random=9",
            "https://picsum.photos/300/300?random=10"
        ],
        title: "Minimalist Backpack",
        price: 59.99,
        isFavorites: true
    },
    {
        images: [
            "https://picsum.photos/300/300?random=11",
            "https://picsum.photos/300/300?random=12"
        ],
        title: "Portable Power Bank",
        price: 25.99,
        isFavorites: false
    },
    {
        images: [
            "https://picsum.photos/300/300?random=13",
            "https://picsum.photos/300/300?random=14"
        ],
        title: "Ergonomic Office Chair",
        price: 199.99,
        isFavorites: true
    },
    {
        images: [
            "https://picsum.photos/300/300?random=15",
            "https://picsum.photos/300/300?random=16"
        ],
        title: "Smartphone Stand",
        price: 15.99,
        isFavorites: false
    },
    {
        images: [
            "https://picsum.photos/300/300?random=17",
            "https://picsum.photos/300/300?random=18"
        ],
        title: "Compact Digital Camera",
        price: 129.99,
        isFavorites: true
    },
    {
        images: [
            "https://picsum.photos/300/300?random=19",
            "https://picsum.photos/300/300?random=20"
        ],
        title: "Bluetooth Smart Speaker",
        price: 69.99,
        isFavorites: false
    },
    {
        images: [
            "https://picsum.photos/300/300?random=21",
            "https://picsum.photos/300/300?random=22"
        ],
        title: "LED Desk Lamp",
        price: 39.99,
        isFavorites: true
    },
    {
        images: [
            "https://picsum.photos/300/300?random=23",
            "https://picsum.photos/300/300?random=24"
        ],
        title: "Stylish Wristwatch",
        price: 79.99,
        isFavorites: false
    },
    {
        images: [
            "https://picsum.photos/300/300?random=25",
            "https://picsum.photos/300/300?random=26"
        ],
        title: "Portable Coffee Maker",
        price: 34.99,
        isFavorites: true
    },
    {
        images: [
            "https://picsum.photos/300/300?random=27",
            "https://picsum.photos/300/300?random=28"
        ],
        title: "Travel Organizer Set",
        price: 19.99,
        isFavorites: false
    }
];




type Product = {
    images: string[];
    title: string;
    price: number;
    isFavorites: boolean;
};



const Favorites = () => {
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Favorites</h1>

            <div className="mt-7 w-full flex justify-end">
                <Searchbar size="sm" placeholder="Search Product..." />
            </div>
            <div className="mt-4">
                <Ps>
                    {products.map((product: Product) => {
                        return product.isFavorites && <Ps.Product images={product.images} title={product.title} price={product.price} isFavorites={product.isFavorites} />
                    })}
                </Ps>

            </div>

        </div>
    )
}


export default Favorites