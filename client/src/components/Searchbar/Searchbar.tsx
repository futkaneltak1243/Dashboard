import { Input } from "../Input"
import type { ChangeEventHandler, FC } from "react"
import { Search } from "lucide-react"
import { cn } from "../classNames"


interface SearchbarProps {
    color?: "default" | "soft";
    size?: "full" | "lg" | "md" | "sm";
    placeholder?: string;
    buttonClick?: () => void;
    onChange?: ChangeEventHandler<HTMLInputElement>
}


const SearchInput: FC<SearchbarProps> = ({
    color = "soft",
    size = "lg",
    placeholder = "Search...",
    buttonClick,
    onChange,
}) => {
    return (
        <div className={cn("inline-flex w-full", {
            "max-w-[581px]": size === "lg",
            "max-w-[393px]": size === "md",
            "max-w-[253px]": size === "sm",
        })}>
            <button
                className={cn("rounded-l-full flex items-center justify-center dark:bg-items-dark2 border border-midgray border-r-0 cursor-pointer",
                    {
                        "bg-items-light": color === "default",
                        "bg-layout-light": color === "soft",
                        "w-[65px] h-[56px]": size === "full" || size === "lg",
                        "w-[45px] h-[38px]": size === "md",
                        "w-[40px] h-[38px]": size === "sm",
                    }
                )}
                onClick={buttonClick}
            >
                <Search
                    className={cn("text-midgray", {
                        "w-[18px] h-[18px]": size === "md",
                        "w-[16px] h-[16xpx]": size === "sm",
                    })}
                />
            </button>
            <Input variant={"search"} color={color} size={size} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}


export default SearchInput