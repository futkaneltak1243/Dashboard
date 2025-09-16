import { cva, type VariantProps } from "class-variance-authority"
import type { FC, ReactNode, ButtonHTMLAttributes } from "react"
import { cn } from "../classNames"




const buttonVariants = cva(
    "w-full flex items-center justify-center cursor-pointer rounded-[8px] transiton-all duration-[150ms]",
    {
        variants: {
            variant: {
                default: "text-white bg-[#4880FF] hover:bg-[#4277EF] ",
                outline: "text-[#4880FF] border border-[#4880FF] bg-transparent hover:text-white hover:bg-[#4880FF] rounded-full "
            },
            size: {
                sm: "h-[36px] max-w-[129px] text-sm",
                md: "h-[48px] max-w-[147px]",
                base: "h-[43px] max-w-[238px]",
                narrow: "h-[60px] max-w-[180px]"
            }
        },
        compoundVariants: [
            {
                variant: "default",
                size: "sm",
                className: "rounded-[6px]"

            }
        ],
        defaultVariants: {
            variant: "default",
            size: "base"
        }
    }

)


interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    children?: ReactNode
    className?: string
}

const Button: FC<ButtonProps> = ({
    children,
    className,
    variant,
    color,
    size,
    ...props

}) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button