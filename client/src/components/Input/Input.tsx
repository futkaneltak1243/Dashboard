import type { FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../classNames";

const inputVariants = cva(
    "placeholder:text-midgray text-[14px] dark:text-lightgray focus:outline-none border border-midgray dark:bg-items-dark2",
    {
        variants: {
            variant: {
                default: "p-2 rounded-[4px]",
                search: "rounded-r-full border-l-0",
            },
            color: {
                default: "bg-items-light ",
                soft: "bg-layout-light ",
            },
            size: {
                full: "w-full h-[56px]",
                lg: "max-w-[516px] w-full h-[56px]",
                md: "max-w-[348px] w-full h-[38px]",
                sm: "max-w-[213px] w-full h-[38px]",
            },
        },
        defaultVariants: {
            variant: "default",
            color: "default",
            size: "lg",
        },
    }
);

interface InputProps
    extends VariantProps<typeof inputVariants>,
    Omit<React.ComponentProps<"input">, "color" | "size"> { }

const Input: FC<InputProps> = ({
    className,
    variant,
    color,
    size,
    placeholder,
    ...props
}) => {
    return (
        <input
            type="text"
            className={cn(inputVariants({ variant, color, size }), className)}
            placeholder={placeholder}
            {...props}
        />
    );
};

export default Input;