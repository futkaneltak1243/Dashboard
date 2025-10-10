import type { FC, ReactNode } from "react"
import { useCallback, useState } from "react"
import { ChevronRight, ChevronLeft, Trash2 } from "lucide-react"
import { cn } from "../classNames"
import { Heart } from 'lucide-react';
import { ActionButtons } from "../ActionButtons";


interface SliderProps {
    images: string[]
}

interface ProductProps {
    className?: string;
    images: string[]
    title: string;
    price: number;
    isFavorites: 1 | 0;
    editClick?: () => void;
    deleteClick?: () => void;
    likeClick?: () => void;
}

interface ProductsProps {
    children: ReactNode
}

const Slider: FC<SliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const lastIndext = images.length - 1

    const handleRightClick = useCallback(() => {
        setCurrentIndex((prev: number) => {
            return prev === lastIndext ? 0 : prev + 1
        })
    }, [lastIndext])

    const handleLeftClick = useCallback(() => {
        setCurrentIndex((prev: number) => {
            return prev === 0 ? lastIndext : prev - 1
        })
    }, [lastIndext])

    return (
        <div className="w-full  flex overflow-hidden relative aspect-[9/8]">
            {images.map((image: string, index: number) => {
                return (<img
                    src={image}
                    key={index}
                    className={cn("absolute inset-0 w-full transition-all h-full object-cover opacity-100 duration-150 translate-x-0", {
                        "opacity-0 -translate-x-full": index < currentIndex,
                        "opacity-0 translate-x-full": index > currentIndex,

                    })}
                />)
            })}
            <button
                className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] xs-products-slider-buttons:w-[30px] xs-products-slider-buttons:h-[30px] lg:w-[41px] lg:h-[41px] flex items-center justify-center z-10 bg-layout-light dark:bg-items-dark rounded-full cursor-pointer shadow-md"
                onClick={handleRightClick}
            >
                <ChevronRight size={16} className="text-text-light dark:text-text-dark" />
            </button>
            <button
                className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] xs-products-slider-buttons:w-[30px] xs-products-slider-buttons:h-[30px] lg:w-[41px] lg:h-[41px]  flex items-center justify-center z-10 bg-layout-light dark:bg-items-dark rounded-full cursor-pointer shadow-md"
                onClick={handleLeftClick}
            >
                <ChevronLeft size={16} className="text-text-light dark:text-text-dark" />
            </button>
        </div>
    )
}


const Product: FC<ProductProps> = ({ images, title, price, isFavorites, editClick, deleteClick, likeClick }) => {
    return (
        <div className=" rounded-xl shadow-sm overflow-hidden">

            <Slider images={images} />

            <div className="h-[150px] md:h-[180px] p-[17px] md:p-[22px] lg:p-[24px] flex items-start justify-between bg-items-light dark:bg-items-dark ">
                <div className="flex items-start justify-between flex-col h-full flex-4">
                    <div>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-text-light dark:text-text-dark font-semibold mb-[8px]">{title}</p>
                        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-[#4880FF]">${price.toFixed(2)}</p>
                    </div>
                    <div >
                        <button
                            className=" w-full  p-2 sm:p-0 sm:w-[107px] sm:h-[32px] lg:w-[126px] lg:h-[38px] bg-layout-light dark:bg-items-dark2 rounded-lg text-[10px] sm:text-xs dark:text-text-dark text-text-light font-semibold cursor-pointer"
                            onClick={editClick}
                        >
                            Edit Product
                        </button>

                    </div>
                </div>
                <div className="flex-1 flex justify-between items-end flex-col h-full">
                    <button
                        className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] lg:w-[44px] lg:h-[44px] bg-[#F9F9F9] flex items-center justify-center rounded-full cursor-pointer dark:bg-items-dark2"
                        onClick={likeClick}
                    >
                        <Heart className={cn("w-3 h-3 sm:w-4 sm:h-4 md:w-5 lg:w-6 md:h-5 lg:h-6  text-red-500",
                            {
                                "fill-current": isFavorites === 1
                            }
                        )} />

                    </button>

                    <ActionButtons>
                        <ActionButtons.Button Icon={Trash2} type="icon" iconClass="w-5 h-5" onClick={deleteClick} />
                    </ActionButtons>
                </div>

            </div>

        </div>
    )


}

const Products: FC<ProductsProps> & {
    Product: FC<ProductProps>
} = ({ children }) => {
    return (
        <div className="flex items-center justify-center w-full ">
            <div className="grid gap-[15px] md:gap-[30px] xl:grid-cols-3 grid-cols-2 w-full">
                {children}
            </div>

        </div>

    )
}

Products.Product = Product

export default Products